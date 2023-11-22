import { Nav } from "../../components/nav/Nav";
import perfil from "../../assets/perfil.png";
import { UserChat } from "./components/UserChat";
import "./Chats.css";

const ejemplos = [
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
  {
    imgUsuario: perfil,
    user: "Messi Ronaldo Ocoro",
  },
];

const chats = [
  {
    message: "Chichón!",
    user: "usuario",
  },
  {
    message: "Hablamelo, cabezón",
    user: "otro",
  },
  {
    message: "JAJAJAJAJA",
    user: "otro",
  },
  {
    message: "Va a jugar o que?",
    user: "usuario",
  },
  {
    message: "Vamos al lol :)",
    user: "usuario",
  },
];

export const Chats = () => {
  return (
    <div className="chats">
      <Nav />
      <div className="chats-container">
        <div className="chat__nav scroll">
          {ejemplos?.map((chat, index) => (
            <UserChat
              key={index}
              profile={chat?.imgUsuario}
              name={chat?.user}
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
          />
        </div>
      </div>
    </div>
  );
};
