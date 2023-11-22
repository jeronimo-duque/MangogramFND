import PropTypes from "prop-types";
import "./Notification.css";

export const Notification = ({
  images,
  message,
  showButton,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="instagram-notification">
      <div className="images-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`image-${index}`} />
        ))}
      </div>
      <div className="message-container">
        <p>{message}</p>
      </div>
      {showButton && (
        <div className="button-container">
          <button onClick={onButtonClick}>{buttonText}</button>
        </div>
      )}
    </div>
  );
};

Notification.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  message: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};
