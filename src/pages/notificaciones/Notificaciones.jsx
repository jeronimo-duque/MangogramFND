import { Nav } from "../../components/nav/Nav";
import { Notification } from "./components/notification";
import "./Notificaciones.css";

const notificaciones = [
  {
    images: [
      "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2016/06/29/14671924366801.jpg",
    ],
    message: "Este es un mensaje de prueba cariño 💕💕💕💕",
  },
  {
    images: [
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    ],
    message: "Bobo hpta, que hace por alla manito",
  },
  {
    images: [
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    ],
    message: "No papi, eso ya no lo entregamos, el tiempo no da",
  },
  {
    images: [
      "https://pbs.twimg.com/profile_images/1407785676167340033/0JBU-SDx_200x200.jpg",
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg",
    ],
    message: "want to be your own boss? write me at mp",
    button: "Seguir",
  },
];

export const Notificaciones = () => {
  return (
    <div className="notificaciones">
      <Nav></Nav>
      <div className="notificaciones-content">
        <h2>Checa tus notis!</h2>
        <h3>Este mes</h3>
        {notificaciones.map((notificacion, index) => (
          <Notification
            key={index}
            images={notificacion.images}
            message={notificacion.message}
            showButton={notificacion?.button != null}
            buttonText={notificacion?.button}
          />
        ))}
      </div>
    </div>
  );
};
