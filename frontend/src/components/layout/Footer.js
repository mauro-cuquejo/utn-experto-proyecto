import React from 'react';
import '../../styles/components/layout/Footer.css'

const Footer = (props) => {
    let fecha = new Date();
    let anio = fecha.getFullYear();

    return (
        <footer>
            <p>Todos los derechos Reservados. Printered año: {anio}</p>
        </footer>
    );
}

export default Footer;