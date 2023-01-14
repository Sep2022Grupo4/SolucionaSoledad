import './App.css';
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import UserContext from './context/UserContext';
import Home from './components/Home';
import NewUser from './components/forms/NewUser';
import NewVolunteer from './components/forms/NewVolunteer';
import UsuariosAsignados from './components/UsuariosAsignados';
import DetalleUsuario from './components/DetalleUsuario';
import LogOut from './components/LogOut';

function App() {

  const [user, setUser] = useState("")

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <LogOut/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nuevoUsuario" element={<NewUser />} />
            <Route path="/nuevoVoluntario" element={<NewVolunteer />} />
            <Route path="/usuariosAsignados/:id" element={<UsuariosAsignados />} />
            <Route path="/detalleUsuario/:id" element={<DetalleUsuario />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
