import React from 'react';
import Carousel from '../components/layout/Carousel';
import '../styles/pages/NosotrosPage.css'

const NosotrosPage = (props) => {
    const arr = [
        { src: 'images/home/nosotros/carlitos.png', key: 'carlitos', width: '500px', alt: 'logo empresa capisci', opt: 'Carlitos' },
        { src: 'images/home/nosotros/ingrid.png', key: 'ingrid', width: '500px', alt: 'logo empresa catslock', opt: 'Ingrid' },
        { src: 'images/home/nosotros/jorgito.png', key: 'jorgito', width: '500px', alt: 'logo empresa numenara', opt: 'Jorgito' },
        { src: 'images/home/nosotros/maria.png', key: 'maria', width: '500px', alt: 'logo empresa numenara', opt: 'Maria' }
    ];
    return (
        <main className='holder nosotros'>
            <div className='quienes_somos'>
                <h2>¿Quiénes Somos?</h2>
                <p>
                    Somos Printered, un grupo familiar que inició como hobby a realizar impresiones.
                    Primero para nosotros, después para nuestros amigos, después para amigos de amigos.
                    Cuando nos dimos cuenta, ya habíamos comprado nuestro segundo equipo. Después el tercero.
                    Después pasamos de ser tres a ser cinco. Hoy somos más de treinta personas en el staff y seguimos creciendo.
                    Creemos que todavía queda mucho camino por recorrer en este mundo tan lindo como lo es el de los diseños y
                    las impresiones. Si podés imaginarlo, seguro podemos hacerlo.
                </p>
            </div>
            <div className='staff'>
                <h2>Nuestro Staff</h2>
                <div className='personas'>
                    <Carousel props={arr} />
                </div>
            </div>
        </main>
    );
}

export default NosotrosPage;