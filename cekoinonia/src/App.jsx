import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes Globais
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import AboutPage from './pages/AboutPage'; 
import MinistriesPage from './pages/MinistriesPage'; // <-- Novo
import GivingPage from './pages/GivingPage'; // <-- Novo

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-church-dark flex flex-col">
        <Header />
        
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<AboutPage />} /> 
            <Route path="/ministerios" element={<MinistriesPage />} /> 
            <Route path="/doacoes" element={<GivingPage />} /> 
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;