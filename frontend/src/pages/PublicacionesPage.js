import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/PublicacionesPage.css';
import PublicacionItem from '../components/publicaciones/PublicacionItem';
import { useNavigate } from 'react-router-dom';

const PublicacionesPage = (props) => {
    const [loading, setLoading] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarPublicaciones = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/admin/publicaciones', {
                    withCredentials: true
                });
                console.log(response.status)

                console.log(response.data)
                setPublicaciones(response.data.publicaciones);
                setLoading(false);
            } catch (error) {
                navigate('/login')
            }
        }
        cargarPublicaciones();
    }, [navigate]);


    return (
        <section className='holder publicaciones'>
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