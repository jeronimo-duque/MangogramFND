import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Nav } from "../../components/nav/Nav";
import { UserChat } from "./components/UserChat";
import "./Chats.css";

export const Chats = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const userID = localStorage.getItem("uid"); // Suponemos que el ID del usuario está almacenado en localStorage

  // Fetch chats using react-query
  const {
    data: chatsData,
    isLoading,
    isError,
  } = useQuery("chats", () =>
    axios.get(`https://mangogram.onrender.com/api/chats/${userID}`)
  );

  // Handler para el envío de mensajes
  const sendMessage = async () => {
    if (currentMessage.trim() === "") return;
  };

  if (isLoading) return <div>Cargando chats...</div>;
  if (isError) return <div>Error al cargar los chats</div>;

  return (
    <div className="chats">
      <Nav />
      <div className="chats-container">
        <div className="chat__nav scroll">
          {chatsData?.data.map((chat, index) => (
            <UserChat
              key={index}
              profile={chat.participantes[0]?.ProfilePhoto}
              name={chat.participantes[0]?.Nombre}
            />
          ))}
        </div>
        <div className="chat-expand">
          <div className="chat-expand__header">
            <div className="chat-expand__header__title">
              <img
                className="user-chat__imagen"
                src={ejemplos[0]?.imgUsuario}
              />
              <h3 className="user-chat__titulo">{ejemplos[0].user}</h3>
            </div>
          </div>
          <div className="chat-expand__chat scroll">
            {chats.map((chat, index) => {
              if (chat.user != "usuario") {
                return (
                  <div key={index} className="chat__text chat__text--other">
                    {chat.message}
                  </div>
                );
              }

              return (
                <div key={index} className="chat__text">
                  {chat.message}
                </div>
              );
            })}
          </div>
          <input
            className="input__text"
            type="text"
            placeholder="Say something"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Enviar mensaje al presionar Enter
          />
        </div>
      </div>
    </div>
  );
};
