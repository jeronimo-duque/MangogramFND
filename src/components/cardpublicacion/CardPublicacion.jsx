import "./CardPublicacion.css"; // Asegúrate de tener este archivo CSS para estilos
import PropTypes from "prop-types";
import axios from "axios";
import Modal from "react-modal";
import commentIcon from "../../assets/Comments.png";
import deleteIcon from "../../assets/delete.png";

import "./CardPublicacion.css";
import { useState } from "react";
import { Post } from "../../pages/post/Post";
import { useNavigate } from "react-router-dom";

const CardPublicacion = ({
  IDPublicacion,
  IDUsuarioPublicacion,
  profilePhoto,
  username,
  mainImage,
  comentarios,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const userID = localStorage.getItem("uid");

  const handleDelete = async () => {
    try {
      if (
        window.confirm("¿Estás seguro de que quieres borrar esta publicación?")
      ) {
        await axios.delete(
          `https://mangogram.onrender.com/api/publicaciones/${IDPublicacion}`
        );
        alert("Publicación borrada con éxito");
      }
    } catch (error) {
      console.error("Ocurrió un error al borrar la publicación", error);
      alert("No se pudo borrar la publicación");
    }
  };

  const navigate = useNavigate();

  const handleProfileClick = (uid) => {
    localStorage.setItem("uidselect", uid);
    navigate("/perfil");
  };

  return (
    <div className="home-item">
      <div className="home-post__user">
        <div onClick={() => handleProfileClick(IDUsuarioPublicacion)}>
          <img src={profilePhoto} alt={username} className="user-image" />
          <p>{username}</p>
        </div>
        {userID === IDUsuarioPublicacion && (
          <img
            onClick={handleDelete}
            className="delete-button"
            src={deleteIcon}
            alt="Borrar publicación"
          />
        )}
      </div>
      <div className="home-post">
        <img src={mainImage} alt="Publicación" className="main-image" />
        <div className="home-post__info">
          <div>
            <img
              src={commentIcon}
              alt="Comentar"
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          contentLabel="Publicación completa"
          className="Modal"
          overlayClassName="Overlay"
        >
          <Post
            IDPublicacion={IDPublicacion}
            profilePhoto={profilePhoto}
            username={username}
            mainImage={mainImage}
            comentarios={comentarios}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      </div>
      <div className="stats">
        <div className="comments-text">
          {comentarios.map((comentario, index) => (
            <p key={index}>
              <strong>@{comentario.IDUsuario.Nombre}</strong>:{" "}
              {comentario.mensaje}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

CardPublicacion.propTypes = {
  IDPublicacion: PropTypes.string.isRequired,
  IDUsuarioPublicacion: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
  comentarios: PropTypes.arrayOf(
    PropTypes.shape({
      mensaje: PropTypes.string.isRequired,
      hora: PropTypes.instanceOf(Date).isRequired,
      IDUsuario: PropTypes.string.isRequired,
      Nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardPublicacion;
