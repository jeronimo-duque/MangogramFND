import { useQuery } from "react-query";
import axios from "axios";
import { Nav } from "../../components/nav/Nav";
import "./Home.css";
import { UserRecomend } from "./components/UserRecomend";
import CardPublicacion from "../../components/cardpublicacion/CardPublicacion";

export const Home = () => {
  // Utiliza React Query para obtener las publicaciones
  const {
    data: publicaciones,
    isLoading,
    isError,
    error,
  } = useQuery(
    "publicaciones",
    () =>
      axios
        .get("https://mangogram.onrender.com/api/publicaciones")
        .then((res) => res.data),
    { refetchInterval: 2000 }
  );

  // Manejo de carga y error
  if (isLoading) return <p>Cargando publicaciones...</p>;
  if (isError) return <p>Error al cargar las publicaciones: {error.message}</p>;

  return (
    <div className="home">
      <Nav />
      <div className="column home-item__post">
        <UserRecomend />
        {/* Contenedor para las publicaciones */}
        <div>
          {publicaciones.map((publicacion) => (
            <CardPublicacion
              IDPublicacion={publicacion._id}
              IDUsuarioPublicacion={publicacion.IDUsuario._id}
              key={publicacion._id} // Asegúrate de que las publicaciones tienen un _id único
              profilePhoto={publicacion.IDUsuario.ProfilePhoto}
              username={publicacion.IDUsuario.Nombre}
              mainImage={publicacion.Image}
              comentarios={publicacion.Comentarios}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
