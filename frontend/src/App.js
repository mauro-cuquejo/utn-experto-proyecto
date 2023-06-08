import { useState } from 'react';
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
import LogoutPage from './pages/LogoutPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route index path='/' element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/nosotros' element={<NosotrosPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/publicaciones' element={<PublicacionesPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/contacto' element={<ContactoPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/login' element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/logout' element={<LogoutPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}


export default App;
