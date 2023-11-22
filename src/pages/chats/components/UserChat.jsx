import PropTypes from "prop-types";
import "./UserChat.css";

export const UserChat = ({ profile, name, onClick }) => {
  return (
    <div className="user-chat" onClick={onClick}>
      <img className="user-chat__imagen" src={profile} />
      <h3 className="user-chat__titulo">{name}</h3>
    </div>
  );
};

UserChat.propTypes = {
  profile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.any,
};
