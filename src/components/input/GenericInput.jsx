import PropTypes from "prop-types";
import "./GenericInput.css";

const GenericInput = ({ label, type, id, value, onChange }) => {
  return (
    <div className="input">
      <label className="input__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input__input"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

GenericInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default GenericInput;
