import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Destinos from './pages/Destinos/Destinos';
import MeusDestinos from './pages/MeusDestinos/MeusDestinos';
import EditarDestino from './pages/EditarDestino/EditarDestino';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<ProtectRoute element={<Home />} />} />
        <Route path="/destinos" element={<ProtectRoute element={<Destinos />} />} />
        <Route path="/meus-destinos" element={<ProtectRoute element={<MeusDestinos />} />} />
        <Route path="/editar-destino" element={<ProtectRoute element={<EditarDestino />} />} />
      </Routes>
    </Router>
    </>
  )
}

export default App;
