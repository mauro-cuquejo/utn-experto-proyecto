import { useEffect } from 'react';
import '../styles/pages/LoginPage.css'
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ setUser, loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const cargarContactoPage = async () => {
            setUser(undefined);
            setLoggedIn(false);
            navigate('/login');
        }

        cargarContactoPage();
    }, [setUser, setLoggedIn, navigate]);
}

export default LogoutPage;