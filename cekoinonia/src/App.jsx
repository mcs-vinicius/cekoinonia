import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes Globais
import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen'; // <-- Novo
import ScrollToTop from './components/ScrollToTop'; // Assumindo que você criou na interação anterior

// Páginas
import Home from './pages/Home';
import AboutPage from './pages/AboutPage'; 
import MinistriesPage from './pages/MinistriesPage';
import GivingPage from './pages/GivingPage';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* Tela de Carregamento animada */}
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}

      <div className="min-h-screen bg-[#050505] flex flex-col">
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