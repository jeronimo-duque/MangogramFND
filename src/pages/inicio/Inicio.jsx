import { Form } from "./components/Form";
import image from "../../assets/login.png";
import "./Inicio.css";

export const Inicio = () => {
  return (
    <div className="inicio">
      <img className="inicio__image" src={image} />
      <div>
        <Form></Form>
        <div className="message">
          <p>Remember, have fun and be gentle!</p>
          <p>-the MangoGram Team</p>
        </div>
      </div>
    </div>
  );
};
