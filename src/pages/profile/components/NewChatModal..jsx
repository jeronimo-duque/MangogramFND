import { useState } from "react";
import Modal from "react-modal";
import { useMutation } from "react-query";
import axios from "axios";
import GenericInput from "../../../components/input/GenericInput";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const NewChatModal = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const createChatMutation = useMutation(
    (newChatData) => {
      return axios.post(
        "https://mangogram.onrender.com/api/chats",
        newChatData
      );
    },
    {
      onSuccess: () => {
        navigate("/chat"); // Redirigir a la página de chats
      },
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (createChatMutation.isLoading) return;

    const enviadoPor = localStorage.getItem("uid");
    const participantId = localStorage.getItem("uidselect");
    if (!enviadoPor || !participantId) {
      alert("Información del chat no válida");
      return;
    }

    const newChatData = {
      enviadoPor,
      texto: message, // Mensaje predeterminado o controlado por otro input
      participantes: [enviadoPor, participantId], // El ID del usuario logueado y el del otro participante
    };

    createChatMutation.mutate(newChatData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={!createChatMutation.isLoading && onClose}
      contentLabel="Crear Nuevo Chat"
      className="Modal"
      overlayClassName="Overlay"
    >
      <h2>Crear Nuevo Chat</h2>
      <form onSubmit={handleSubmit}>
        <GenericInput
          label="Primer mensaje"
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {createChatMutation.isLoading ? (
          <Loader />
        ) : (
          <>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
            <button type="submit">Crear Chat</button>
          </>
        )}
      </form>
    </Modal>
  );
};

NewChatModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewChatModal;
