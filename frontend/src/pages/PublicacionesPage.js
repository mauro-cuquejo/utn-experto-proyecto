import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/PublicacionesPage.css';
import PublicacionItem from '../components/publicaciones/PublicacionItem';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PublicacionesPage = ({ user, loggedIn, setLoggedIn }) => {
    const [loading, setLoading] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const cargarPublicaciones = async () => {
            if (loggedIn) {
                setLoading(true);
                setError(undefined);
                try {
                    const response = await axios.get('http://localhost:3000/admin/publicaciones', { params: { user: user } });
                    if (response.status === 200 || response.status === 204) {
                        setPublicaciones(response.data.publicaciones);
                    } else {
                        throw new Error();
                    }
                    setLoading(false);
                } catch (error) {
                    setError("Error durante la carga de publicaciones: " + error);
                }
            } else {
                navigate('/login')
            }
        }
        cargarPublicaciones();
    }, [user, loggedIn, navigate]);
    if (publicaciones.length > 0) {
        return (
            <section className='holder publicaciones'>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div>
                    <h2>Publicaciones</h2>
                </div>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    publicaciones.map(item =>
                        <PublicacionItem
                            user={user}
                            id={item.id}
                            titulo={item.titulo}
                            contenido={item.contenido}
                            precio={item.precio}
                            imagen={item.imagen}
                        />)
                )}
                {user && <div className="col-3 text-right">
                    <NavLink to="/agregar" className="btn btn-primary"><i className="fa fa-plus"></i></NavLink>
                </div>}
            </section>
        );
    } else {
        return (<section className='holder publicaciones'>
            <p>No se encontraron publicaciones {user ? "para el usuario " + user : ""}</p>
            {user && <div className="col-3 text-right">
                <NavLink to="/agregar" className="btn btn-primary"><i className="fa fa-plus"></i></NavLink>
            </div>}
        </section>

        );
    }

}

export default PublicacionesPage;