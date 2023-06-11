import '../../styles/pages/PublicacionItem.css';
import { NavLink } from 'react-router-dom';

const PublicacionItem = (props) => {
    const { user, id, titulo, contenido, precio, imagen } = props;
    return (
        <div className="tarjeta">
            <div className="card" width="18rem">
                <div className='publicaciones'>
                    {imagen && <div dangerouslySetInnerHTML={{ __html: imagen }} />}
                </div>

                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><h5 className="card-title">{titulo}</h5></li>
                        <li className="list-group-item"><p className="card-text mb-3">{contenido}</p></li>
                        <li className="list-group-item"><h6 className="card-subtitle mb-3 text-muted">Precio: ${precio}</h6></li>
                    </ul>
                </div>
                {user && <NavLink to={"/modificar/" + id} title="Editar" className="btn btn-sm btn-secondary">
                    <i className="fa fa-pencil"></i>
                </NavLink>}
                {user && <NavLink to={"/eliminar/" + id} title="Eliminar" className="btn btn-sm btn-danger">
                    <i className="fa fa-trash"></i>
                </NavLink>}

            </div>
        </div>


    );
}

export default PublicacionItem;