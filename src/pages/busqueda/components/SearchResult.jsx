import PropTypes from "prop-types";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ id, profileImage, name }) => {
  const navigate = useNavigate();

  const handleProfileClick = (uid) => {
    localStorage.setItem("uidselect", uid);
    navigate("/perfil");
  };

  return (
    <div className="search-result" onClick={() => handleProfileClick(id)}>
      <img src={profileImage} alt={name} className="profile-image" />
      <span className="profile-name">{name}</span>
    </div>
  );
};

SearchResult.propTypes = {
  id: PropTypes.any,
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchResult;
