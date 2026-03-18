import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes Globais (Aparecem em todas as páginas)
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-church-dark flex flex-col">
        {/* O Header fica fixo em todas as rotas */}
        <Header />
        
        {/* O conteúdo dinâmico que muda conforme a página (A rota) */}
        <main className="flex-grow">
          <Routes>
            {/* Rota Principal (Página Inicial) */}
            <Route path="/" element={<Home />} />
            
            {/* Futuramente, adicionaremos outras rotas aqui, exemplo: */}
            {/* <Route path="/sobre" element={<AboutPage />} /> */}
          </Routes>
        </main>

        {/* O Footer fica fixo no fundo em todas as rotas */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;