import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/PublicacionesPage.css';
import PublicacionItem from '../components/publicaciones/PublicacionItem';
import { useNavigate } from 'react-router-dom';

const PublicacionesPage = ({ loggedIn, setLoggedIn }) => {
    const [loading, setLoading] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const cargarPublicaciones = async () => {
            if (loggedIn) {
                setLoading(true);
                try {
                    const response = await axios.get('http://localhost:3000/admin/publicaciones');

                    setPublicaciones(response.data.publicaciones);
                    setLoading(false);
                } catch (error) {
                    setError("Error durante la carga de publicaciones.");
                }
            } else {
                navigate('/login')
            }
        }
        cargarPublicaciones();
    }, [loggedIn, setLoggedIn, navigate]);

    return (
        <section className='holder publicaciones'>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div>
                <h2>Publicaciones</h2>
            </div>
            {loading ? (
                <p>Cargando...</p>
            ) : (


                publicaciones.map(item => <PublicacionItem key={item.id}
                    titulo={item.titulo}
                    descripcion={item.contenido}
                    precio={item.precio}
                    imagen={item.imagen} />)
            )}

        </section>
    );
}

export default PublicacionesPage;