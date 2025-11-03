import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cadastro from './pages/cadastro.jsx';
import Login from './pages/login.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />   {/* Login agora é a página inicial */}
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
