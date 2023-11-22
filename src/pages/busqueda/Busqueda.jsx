import SearchResult from "./components/SearchResult";
import user from "../../assets/perfil.png";
import lupa from "../../assets/lupa.png";
import "./Busqueda.css";
import { Nav } from "../../components/nav/Nav";

export const Busqueda = () => {
  return (
    <div className="busqueda">
      <Nav></Nav>
      <div className="busqueda-content">
        <div className="search-input-container">
          <input type="text" className="search-input" />
          <img src={lupa} className="search-icon" />
        </div>
        <div className="busqueda-resultado">
          <div className="busqueda-resultado__recientes">
            <div className="busqueda-resultado__text">
              <p>Recientes</p>
              <p>Borrar todos</p>
            </div>
            <SearchResult profileImage={user} name="Messi Ronaldo Ocoró" />
            <SearchResult profileImage={user} name="Messi Ronaldo Ocoró" />
            <SearchResult profileImage={user} name="Messi Ronaldo Ocoró" />
            <SearchResult profileImage={user} name="Messi Ronaldo Ocoró" />
            <SearchResult profileImage={user} name="Messi Ronaldo Ocoró" />
            <SearchResult profileImage={user} name="Messi Ronaldo Ocoró" />
          </div>
        </div>
      </div>
    </div>
  );
};
