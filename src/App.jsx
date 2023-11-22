import "./App.css";
import { Home } from "./pages/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Inicio } from "./pages/inicio/Inicio";
import { Registro } from "./pages/registro/Registro";
import { Chats } from "./pages/chats/Chats";
import { Profile } from "./pages/profile/Profile";
import { Busqueda } from "./pages/busqueda/Busqueda";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" exact Component={Inicio} />
          <Route path="/register" Component={Registro} />
          <Route path="/home" Component={Home} />
          <Route path="/chat" Component={Chats} />
          <Route path="/perfil" Component={Profile} />
          <Route path="/buscador" Component={Busqueda} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
