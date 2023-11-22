import { useQuery } from "react-query";
import axios from "axios";
import Modal from "react-modal";
import { Nav } from "../../components/nav/Nav";
import "./Profile.css";
import { useState } from "react";
import { Post } from "../post/Post";
import Loader from "../../components/loader/Loader";
import mango from "../../assets/mango.png";
import book from "../../assets/book.png";

Modal.setAppElement("#root");

export const Profile = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const userID = localStorage.getItem("uid");

  // Fetch user data using react-query
  const {
    data: { data: userData },
  } = useQuery(
    "userData",
    () => axios.get(`https://mangogram.onrender.com/api/usuarios/${userID}`),
    {
      enabled: !!userID,
    }
  );

  console.log(userData);

  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery("profileData", () =>
    axios.get(
      `https://mangogram.onrender.com/api/publicaciones/user/${localStorage.getItem(
        "uid"
      )}`
    )
  );

  if (isLoading) return <Loader />;
  if (isError) return <div>Error al cargar el perfil</div>;

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="profile">
      <Nav />
      <div>
        <div className="profile-header">
          <div className="column image-column">
            <img src={userData.ProfilePhoto} alt={userData.Nombre} />
          </div>
          <div className="buttons-column">
            <div className="buttons">
              <button>Siguiendo</button>
              <button>Enviar mensaje</button>
            </div>
            <div className="list">
              <p>{userData.Habilidades}</p>
            </div>
          </div>
          <div className="column info-column">
            <div className="info-header">
              <img src={book} alt="Additional info" />
              <h2>Mangofía</h2>
            </div>
            <p>{userData.Descripcion}</p>
            <div className="info-column__extend">
              <p>{userData.Nombre}</p>
              <img src={mango} />
              <ul>
                <li>Public</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="profile-posts">
          {profileData?.data.map((post) => (
            <img
              key={post._id}
              src={post.Image}
              alt="Publicación"
              onClick={() => handlePostClick(post._id)}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Publicación completa"
        className="Modal"
        overlayClassName="Overlay"
      >
        {/* El componente Post debe manejar su propio estado y llamadas a la API */}
        {selectedPostId && (
          <Post
            IDPublicacion={selectedPostId}
            mainImage={
              profileData?.data.find((post) => post._id === selectedPostId)
                ?.Image
            }
            comentarios={
              profileData?.data.find((post) => post._id === selectedPostId)
                ?.Comentarios
            }
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};
