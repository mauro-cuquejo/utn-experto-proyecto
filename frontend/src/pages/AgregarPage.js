import { useEffect, useState } from 'react';
import '../styles/pages/ContactoPage.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AgregarPage = ({ user, loggedIn }) => {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");

    const [contenido, setContenido] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [error, setError] = useState("");

    const handlerCambioImagen = (event) => {
        setImagen(event.target.files[0]);
    }

    const handlerCambioTitulo = (event) => {
        setTitulo(event.target.value);
    }
    const handlerCambioPrecio = (event) => {
        setPrecio(event.target.value);
    }
    const handlerCambioContenido = (event) => {
        setContenido(event.target.value);
    }

    useEffect(() => {
        const cargarAgregarPage = async () => {
            if (!loggedIn) {
                navigate('/login')
            }
        }
        cargarAgregarPage();
    }, [loggedIn, navigate]);

    const handlerSubmit = async (event) => {
        event.preventDefault();
        try {
            setError("")
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/publicaciones/agregar`, {
                titulo,
                contenido,
                precio,
                username: user,
                imagen
            },

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
            );

            //verificar el resultado de la response:
            if (response.status === 201) {
                navigate("/mis-publicaciones")
            } else {
                throw new Error(response.status);
            }
        } catch (e) {
            setError('Error en la solicitud: ' + e.response.data.message);
        }
    };
    return (
        <main className="holder contacto">

            <div className="container" margin="100px auto">
                <div className="row">
                    <div className="col-6 offset-3">
                        <form className="formulario" onSubmit={handlerSubmit}>
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}

                            <div className="form-group">
                                <input type="hidden" className="form-control" name="username" value={user} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="titulo">Título:</label>
                                <input type="text" className="form-control" placeholder="Titulo" name="titulo" onChange={handlerCambioTitulo} value={titulo} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contenido">Descripción:</label>
                                <textarea type="text" className="form-control" placeholder="Descripcion Figura"
                                    name="contenido" onChange={handlerCambioContenido} value={contenido}></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="precio">Precio:</label>
                                <input type="text" onChange={handlerCambioPrecio} value={precio} className="form-control" placeholder="Precio" name="precio" />
                            </div>

                            <div className="form-group">
                                <label htmlFor='imagen'>Subir Imagen</label>
                                <input type="file" className="form-control-file" id="imagen" name="imagen" accept="image/*" onChange={handlerCambioImagen} filename={imagen} />
                            </div>

                            <div className="form-buttons-container">
                                <button type="submit" className="btn btn-primary">
                                    <i className="fa fa-save"> Guardar</i>
                                </button>
                                <NavLink className="btn btn-secondary" to="/mis-publicaciones" role="button">
                                    <i className="fa fa-times"> Cancelar</i>
                                </NavLink>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        </main >
    );

}

export default AgregarPage;