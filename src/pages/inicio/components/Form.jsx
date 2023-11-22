import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenericInput from "../../../components/input/GenericInput";
import { Link } from "react-router-dom";
import { Logo } from "../../../components/logo/Logo";
import "./Form.css";

export const Form = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    (loginData) => {
      return axios.post(
        "https://mangogram.onrender.com/api/usuarios/login",
        loginData
      );
    },
    {
      onSuccess: (data) => {
        // Suponiendo que la respuesta del login es similar a la del registro y contiene un uid y un token
        const { uid, token } = data.data;
        localStorage.setItem("uid", uid);
        localStorage.setItem("token", token);

        // Invalidar las consultas del usuario para actualizar la información del usuario en la aplicación
        queryClient.invalidateQueries("userData");

        navigate("/home");
      },
      onError: (error) => {
        // Manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
        console.error("Error during login:", error);
      },
    }
  );

  const handleLogin = (event) => {
    event.preventDefault();
    loginMutation.mutate({
      email: username,
      password: password,
    });
  };

  return (
    <div className="inicio__form-container">
      <Logo />
      <form className="inicio__form-container__form" onSubmit={handleLogin}>
        <GenericInput
          label="Email"
          type="text"
          id="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <GenericInput
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button">
          Get in!
        </button>
      </form>
      <Link to="/register" className="button button--small">
        Regístrate
      </Link>
      <p>Forgot your password?</p>
    </div>
  );
};
