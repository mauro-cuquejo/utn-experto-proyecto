import { useEffect } from 'react';
import '../styles/pages/LoginPage.css'
import { useNavigate } from 'react-router-dom';

const LogoutPage = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const cargarContactoPage = async () => {
            setLoggedIn(false);
            navigate('/login');
        }

        cargarContactoPage();
    }, [setLoggedIn, navigate]);
}

export default LogoutPage;