import { useEffect, useState } from 'react';
import '../styles/pages/ModificarPage.css'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModificarPage = ({ user, loggedIn }) => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [eliminarImagen, setEliminarImagen] = useState(false);
    const [contenido, setContenido] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [imagenIdOriginal, setImagenIdOriginal] = useState("");
    const [imagenActual, setImagenActual] = useState("");
    const [error, setError] = useState("");

    const handlerCambioImagen = (event) => {
        setImagen(event.target.files[0]);
    }

    const handlerEliminarImagen = (event) => {
        setEliminarImagen(event.target.checked);
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
        const cargarModificarPage = async () => {
            if (!loggedIn) {
                navigate('/login')
            } else {
                setError("");
                const response = await axios.get("http://localhost:3000/admin/publicaciones/modificar", {
                    params: { id }
                },)
                if (response.status === 200) {
                    const publicacion = response.data.publicacion;
                    setTitulo(publicacion.titulo);
                    setContenido(publicacion.contenido);
                    setPrecio(publicacion.precio);
                    setImagenActual(publicacion.imagen_actual);
                    setImagenIdOriginal(publicacion.imagen_id);
                }
            }
        }
        cargarModificarPage();
    }, [loggedIn, navigate, id]);

    const handlerSubmit = async (event) => {
        event.preventDefault();
        try {
            setError("")
            const response = await axios.patch("http://localhost:3000/admin/publicaciones/modificar", {
                id,
                titulo,
                contenido,
                precio,
                username: user,
                imagen,
                imagen_delete: eliminarImagen,
                imagen_id_original: imagenIdOriginal
            },

                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
            );

            if (response.status === 201) {
                navigate("/mis-publicaciones")
            } else {
                throw new Error(response.status);
            }
        } catch (e) {
            setError('Error en la solicitud: ' + error.message);
        }
    };
    return (
        <main className="holder modificar">

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
                                <label htmlFor="imagen">Modificar Imagen</label>
                                <input type="file" className="form-control-file" id="imagen" name="imagen" accept="image/*" onChange={handlerCambioImagen} filename={imagen} />
                            </div>
                            <div className="form-group">
                                <input type="hidden" name="img_original" value={imagenIdOriginal}></input>
                                <label htmlFor="img_delete">Eliminar Imagen Actual?</label>
                                <input type="checkbox" id="img_delete" name="img_delete" value={eliminarImagen} onChange={handlerEliminarImagen} />
                                {imagenActual && <div dangerouslySetInnerHTML={{ __html: imagenActual }} />}
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
            </div>
        </main>
    );

}

export default ModificarPage;