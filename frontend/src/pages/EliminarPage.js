import { useEffect, useState } from 'react';
import '../styles/pages/EliminarPage.css'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EliminarPage = ({ user, loggedIn }) => {
    const { id } = useParams();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const cargarEliminarPage = async () => {
            try {
                const response = await axios.delete("http://localhost:3000/admin/publicaciones/eliminar", {
                    params: { id }
                });

                if (response.status === 201) {
                    navigate("/mis-publicaciones")
                } else {
                    throw new Error("No se pudo eliminar la publicación. Intente nuevamente más tarde");
                }
            } catch (e) {
                setError('Error en la solicitud: ' + e);
            }
        }

        cargarEliminarPage();
    }, []);
    return (
        <main className="holder eliminar">
            <div>{error && <div className="alert alert-danger" role="alert">{error}</div>}</div>
            <NavLink className="btn btn-secondary" to="/mis-publicaciones" role="button">
                <i className="fa fa-times"> Cancelar</i>
            </NavLink>
        </main>
    );
}


export default EliminarPage;