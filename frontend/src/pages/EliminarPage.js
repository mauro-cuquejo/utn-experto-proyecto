import { useEffect, useState } from 'react';
import '../styles/pages/ContactoPage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EliminarPage = ({ user, loggedIn }) => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const cargarContactoPage = async () => {
            try {
                const response = await axios.post("http://localhost:3000/admin/publicaciones/eliminar");

                //verificar el resultado de la response:
                if (response.status === 201) {
                    navigate("/mis-publicaciones")
                } else {
                    throw new Error(response.status);
                }
            } catch (e) {
                setError('Error en la solicitud: ' + error);
            }
        };

        cargarContactoPage();
    }, [navigate, error]);
}

export default EliminarPage;