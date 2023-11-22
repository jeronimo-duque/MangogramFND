import "./Post.css";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import axios from "axios";
import { useState } from "react";
import { ChatComment } from "./components/ChatComment";

export const Post = ({ mainImage, comentarios, onClose, IDPublicacion }) => {
  const [comment, setComment] = useState("");

  // Define la mutación con React Query
  const addCommentMutation = useMutation((newComment) => {
    return axios.put(
      `https://mangogram.onrender.com/api/publicaciones/${IDPublicacion}`,
      newComment
    );
  });

  const handleAddComment = () => {
    const newComment = {
      IDUsuario: localStorage.getItem("uid"),
      Nombre: "Nombre de mas",
      mensaje: comment,
    };

    addCommentMutation.mutate(newComment, {
      onSuccess: () => {
        setComment("");
      },
    });
  };
  return (
    <div className="post">
      <div className="post-content">
        <div className="image-container">
          <img
            src={mainImage}
            alt="Publicación"
            className="image-container__image"
          />
        </div>
        <div className="post-chat">
          {comentarios.map((comentario, index) => (
            <ChatComment
              key={index}
              usuario={comentario.IDUsuario.ProfilePhoto}
              nombre={comentario.IDUsuario.Nombre}
              mensaje={comentario.mensaje}
            />
          ))}
          <div className="container-comments">
            <input
              type="text"
              placeholder="Comentar..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div>
              <button onClick={onClose}>Cerrar</button>
              <button onClick={handleAddComment}>Comentar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  IDPublicacion: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
  comentarios: PropTypes.arrayOf(
    PropTypes.shape({
      Nombre: PropTypes.string.isRequired,
      mensaje: PropTypes.string.isRequired,
      // Asumiendo que cada comentario tiene un IDUsuario y una hora
      IDUsuario: PropTypes.string.isRequired,
      hora: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};
