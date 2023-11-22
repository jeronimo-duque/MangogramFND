import { Logo } from "../logo/Logo";
import "./Nav.css";
import Modal from "react-modal";
import mango from "../../assets/mango.png";
import buscar from "../../assets/lupa.png";
import chat from "../../assets/chat.png";
import persona from "../../assets/persona.png";
import agregar from "../../assets/agregar.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import GenericInput from "../input/GenericInput";
import { useMutation } from "react-query";
import axios from "axios";
import Loader from "../loader/Loader";

Modal.setAppElement("#root");

export const Nav = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);

  const mutation = useMutation(
    async ({ IDUsuario, file }) => {
      const formData = new FormData();
      formData.append("IDUsuario", IDUsuario);
      formData.append("file", file);

      const response = await axios.post(
        "https://mangogram.onrender.com/api/publicaciones",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    {
      onSuccess: () => {
        // Cerrar el modal solo después de una creación exitosa
        setModalIsOpen(false);
        alert("Publicación creada con éxito!");
      },
      onError: (error) => {
        alert("Ocurrió un error al crear la publicación");
        console.error(error);
      },
    }
  );

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const IDUsuario = localStorage.getItem("uid");

    if (file && IDUsuario) {
      mutation.mutate({ IDUsuario, file });
    }
  };

  return (
    <div className="nav-container">
      <nav className="nav">
        <Link to="/home">
          <img src={mango} alt="Home" />
        </Link>
        <Link to="/buscador">
          <img src={buscar} alt="Buscar" />
        </Link>
        <Link to="/chat">
          <img src={chat} alt="Chat" />
        </Link>
        <Link to="/perfil">
          <img src={persona} alt="Perfil" />
        </Link>
        <img
          src={agregar}
          alt="Subir Archivo"
          onClick={() => setModalIsOpen(true)}
        />
      </nav>
      <Logo></Logo>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => !mutation.isLoading && setModalIsOpen(false)}
        contentLabel="Subir Archivo"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Subir Archivo</h2>
        <form onSubmit={handleSubmit}>
          <GenericInput
            label="Archivo"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          {mutation.isLoading ? (
            <Loader />
          ) : (
            <>
              <button type="button" onClick={() => setModalIsOpen(false)}>
                Cerrar
              </button>
              <button type="submit">Crear</button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
};
