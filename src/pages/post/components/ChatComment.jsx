import PropTypes from "prop-types";
import "./ChatComment.css";
import { useNavigate } from "react-router-dom";

export const ChatComment = ({ id, usuario, nombre, mensaje }) => {
  const navigate = useNavigate();

  const handleProfileClick = (uid) => {
    localStorage.setItem("uidselect", uid);
    navigate("/perfil");
  };

  return (
    <div className="chat-comment">
      <div className="user-info" onClick={() => handleProfileClick(id)}>
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
  id: PropTypes.any,
  usuario: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  mensaje: PropTypes.string.isRequired,
};
