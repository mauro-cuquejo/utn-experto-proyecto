const PublicacionItem = (props) => {
    const { titulo, contenido, precio, imagen } = props;

    return (
        <div className="novedades">
            <h1>{titulo}</h1>
            <h2>Descripción: {contenido}</h2>
            {imagen ? <img src={imagen} alt={titulo} /> : ''}
            <h3>Precio: {precio}</h3>

            <hr />
        </div>
    );
}

export default PublicacionItem;