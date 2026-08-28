import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes Globais
import Header from './components/Header';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen'; // <-- Novo
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';

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

      {/* O Header fica fora do SmoothScroll de propósito: ele é `position: fixed`,
          e dentro do contêiner que o smoother transforma ele deixaria de ser fixo. */}
      <Header />

      <SmoothScroll>
        <div className="min-h-screen bg-church-dark flex flex-col">
          <main className="grow">
            <Routes>
              {/* `ready` avisa o Hero que o splash saiu da frente, para a
                  animação de entrada dele não rodar escondida por trás. */}
              <Route path="/" element={<Home ready={!loading} />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/ministerios" element={<MinistriesPage />} />
              <Route path="/doacoes" element={<GivingPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </SmoothScroll>

    </BrowserRouter>
  );
}

export default App;