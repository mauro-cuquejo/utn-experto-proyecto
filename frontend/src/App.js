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
import AgregarPage from './pages/AgregarPage';
import ModificarPage from './pages/ModificarPage';
import EliminarPage from './pages/EliminarPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route index path='/' element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/nosotros' element={<NosotrosPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/publicaciones' element={<PublicacionesPage user={undefined} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/agregar' element={<AgregarPage user={user} loggedIn={loggedIn} />} />
          <Route path='/modificar/:id' element={<ModificarPage user={user} loggedIn={loggedIn} />} />
          <Route path='/eliminar/:id' element={<EliminarPage user={user} loggedIn={loggedIn} />} />
          <Route path='/mis-publicaciones' element={<PublicacionesPage user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/contacto' element={<ContactoPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/login' element={<LoginPage user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/logout' element={<LogoutPage user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}


export default App;
