import { useQuery } from "react-query";
import axios from "axios";
import "./UserRecomend.css";
import Loader from "../../../components/loader/Loader";

export const UserRecomend = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery("users", () =>
    axios
      .get("https://mangogram.onrender.com/api/usuarios")
      .then((res) => res.data)
  );

  if (isLoading) return <Loader />;

  if (isError) return <div>Error al cargar la lista de usuarios</div>;

  return (
    <div className="flex-container">
      {users.map((user) => {
        if (user._id != localStorage.getItem("uid"))
          return (
            <div key={user._id} className="flex-item">
              <img
                src={user.ProfilePhoto}
                alt={user.Nombre}
                className="item-image"
              />
              <span className="item-name">{user.Nombre}</span>
            </div>
          );
      })}
    </div>
  );
};
