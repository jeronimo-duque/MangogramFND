import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Nav } from "../../components/nav/Nav";
import { UserChat } from "./components/UserChat";
import "./Chats.css";

export const Chats = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatData, setCurrentChatData] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const userID = localStorage.getItem("uid");

  // Fetch chats using react-query
  const {
    data: chatsData,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    "chats",
    () => axios.get(`https://mangogram.onrender.com/api/chats/${userID}`),
    {
      refetchInterval: 2000,
      onSuccess: (data) => {
        // Encuentra el chat actualizado basándose en currentChat
        const updatedCurrentChat = data?.data.find(
          (chat) => chat._id === currentChat
        );
        // Si se encuentra el chat actualizado, actualiza el estado
        if (updatedCurrentChat) {
          setCurrentChatData(updatedCurrentChat);
        }
      },
    }
  );

  const sendMessageMutation = useMutation(
    (newMessage) => {
      return axios.post(
        `https://mangogram.onrender.com/api/chats/mensajes/${currentChat}`,
        newMessage
      );
    },
    {
      onSuccess: () => {
        // Refetch chats query para obtener los mensajes actualizados
        refetch();
        setCurrentMessage(""); // Limpiar el input después de enviar el mensaje
      },
      // Puedes manejar los errores como prefieras aquí
      onError: (error) => {
        console.error("Error al enviar el mensaje:", error);
      },
    }
  );

  // Handler para el envío de mensajes
  const sendMessage = () => {
    if (currentMessage.trim() === "") return; // No enviar mensajes vacíos

    const newMessage = {
      texto: currentMessage,
      enviadoPor: userID,
    };

    sendMessageMutation.mutate(newMessage);
  };

  const selectChat = (chat) => {
    setCurrentChat(chat._id);
    setCurrentChatData(chat);
  };

  if (isLoading) return <div>Cargando chats...</div>;
  if (isError) return <div>Error al cargar los chats</div>;

  return (
    <div className="chats">
      <Nav />
      <div className="chats-container">
        <div className="chat__nav scroll">
          {chatsData?.data.map((chat, index) => {
            // Encuentra el participante que no es el usuario actual
            const otherParticipant = chat.participantes.find(
              (p) => p._id !== userID
            );

            // Solo renderiza el UserChat si existe otro participante
            return otherParticipant ? (
              <UserChat
                key={index}
                profile={otherParticipant.ProfilePhoto}
                name={otherParticipant.Nombre}
                onClick={() => selectChat(chat)}
              />
            ) : null;
          })}
        </div>
        {currentChat && (
          <div className="chat-expand">
            <div className="chat-expand__header">
              <div className="chat-expand__header__title">
                <img
                  className="user-chat__imagen"
                  src={
                    currentChatData.participantes.find((p) => p._id !== userID)
                      ?.ProfilePhoto
                  }
                  alt="User"
                />
                <h3 className="user-chat__titulo">
                  {
                    currentChatData.participantes.find((p) => p._id !== userID)
                      ?.Nombre
                  }
                </h3>
              </div>
            </div>
            <div className="chat-expand__chat scroll">
              {currentChatData.mensajes.map((mensaje, index) => (
                <div
                  key={index}
                  className={`chat__text ${
                    mensaje.enviadoPor === userID ? "" : "chat__text--other"
                  }`}
                >
                  {mensaje.texto}
                </div>
              ))}
            </div>
            <input
              className="input__text"
              type="text"
              placeholder="Say something"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
        )}
      </div>
    </div>
  );
};
