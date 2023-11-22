import PropTypes from "prop-types";
import "./SearchResult.css";

const SearchResult = ({ profileImage, name, onClose }) => {
  return (
    <div className="search-result">
      <img src={profileImage} alt="Profile" className="profile-image" />
      <span className="profile-name">{name}</span>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
};

SearchResult.propTypes = {
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchResult;
