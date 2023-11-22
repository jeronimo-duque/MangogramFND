import PropTypes from "prop-types";
import "./UserChat.css";

export const UserChat = ({ profile, name }) => {
  return (
    <div className="user-chat">
      <img className="user-chat__imagen" src={profile} />
      <h3 className="user-chat__titulo">{name}</h3>
    </div>
  );
};

UserChat.propTypes = {
  profile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
