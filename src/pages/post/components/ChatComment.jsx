import PropTypes from "prop-types";
import "./ChatComment.css";

export const ChatComment = ({ usuario, nombre, mensaje }) => {
  return (
    <div className="chat-comment">
      <div className="user-info">
        <img src={usuario} alt="Avatar del usuario" />
      </div>
      <div className="text-container">
        <div className="nombre">{nombre}</div>
        <div className="mensaje">{mensaje}</div>
      </div>
    </div>
  );
};

ChatComment.propTypes = {
  usuario: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
};
