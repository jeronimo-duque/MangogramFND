import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchResult from "./components/SearchResult";
import lupa from "../../assets/lupa.png";
import "./Busqueda.css";
import { Nav } from "../../components/nav/Nav";
import Loader from "../../components/loader/Loader";

export const Busqueda = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Obtener todos los usuarios
  const { data: usersData, isLoading } = useQuery(
    "allUsers",
    () => axios.get(`https://mangogram.onrender.com/api/usuarios`),
    {
      // La consulta se ejecutará inmediatamente y no depende del término de búsqueda
      keepPreviousData: true, // Opcional: mantiene los datos anteriores mientras se cargan nuevos datos
    }
  );

  // Filtrar los usuarios en el cliente basándose en searchTerm
  const filteredUsers = searchTerm
    ? usersData?.data.filter((user) =>
        user.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleProfileClick = (uid) => {
    localStorage.setItem("uidselect", uid);
    navigate("/perfil");
  };

  return (
    <div className="busqueda">
      <Nav />
      <div className="busqueda-content">
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar perfiles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={lupa} className="search-icon" alt="Buscar" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="busqueda-resultado">
            {/* Renderiza los usuarios filtrados */}
            {filteredUsers.map((user) => (
              <SearchResult
                key={user._id}
                id={user._id}
                profileImage={user.ProfilePhoto}
                name={user.Nombre}
                onClose={() => handleProfileClick(user._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
