import "./Form.css";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GenericInput from "../../../components/input/GenericInput";

export const Form = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const mutation = useMutation(
    (newUserData) => {
      const formData = new FormData();
      Object.keys(newUserData).forEach((key) => {
        formData.append(key, newUserData[key]);
      });

      return axios.post(
        "https://mangogram.onrender.com/api/usuarios/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("token", data.token);

        navigate("/");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserData = {
      Nombre: nombre,
      Descripcion: descripcion,
      Habilidades: habilidades,
      email,
      password,
      file,
    };
    mutation.mutate(newUserData);
  };

  return (
    <form
      className="form"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <div className="form__container">
        <GenericInput
          label="Nombre"
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <GenericInput
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form__container">
        <GenericInput
          label="Descripción"
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <GenericInput
          label="Habilidades"
          type="text"
          id="habilidades"
          value={habilidades}
          onChange={(e) => setHabilidades(e.target.value)}
        />
      </div>
      <div className="form__container">
        <GenericInput
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <GenericInput
          label="Foto de Perfil"
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit" className="button">
        Registrate
      </button>
    </form>
  );
};
