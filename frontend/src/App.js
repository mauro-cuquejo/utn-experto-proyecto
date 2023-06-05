import React from 'react';
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NosotrosPage from './pages/NosotrosPage';
import PublicacionesPage from './pages/PublicacionesPage';
import ContactoPage from './pages/ContactoPage';
import './App.css'
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Header />

      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/nosotros' element={<NosotrosPage />} />
          <Route path='/publicaciones' element={<PublicacionesPage />} />
          <Route path='/contacto' element={<ContactoPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
