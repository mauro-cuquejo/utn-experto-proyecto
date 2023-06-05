import React from 'react';
import Carousel from '../components/layout/Carousel';
import '../styles/pages/HomePage.css'


const HomePage = (props) => {
    const arr = [
        { src: 'images/home/empresas/capisci.png', key: 'capisci', width: '500px', alt: 'logo empresa capisci', opt: 'Simplemente excelente' },
        { src: 'images/home/empresas/catslock.png', key: 'catslock', width: '500px', alt: 'logo empresa catslock', opt: 'Muy profesionales. Siempre atentos a lo que necesitábamos' },
        { src: 'images/home/empresas/numenara.png', key: 'numenara', width: '500px', alt: 'logo empresa numenara', opt: 'Irremplazables. Sólo tenemos palabras de agradecimiento' }
    ];
    return (
        <main className='holder homepage'>
            <div className='homeimg'>
                <img src='images/home/img01.png' alt='cuarto de impresoras 3d' />
            </div>
            <div className='columnas'>
                <div className='bienvenidos'>
                    <h2>Bienvenidos</h2>
                    <p>Somos Printered. Nos dedicamos a la impresión de insumos 3d. Mirá nuestro catálogo, que seguro algo te interesa.</p>
                </div>

                <div className='empresas'>
                    <h3>Empresas que nos recomiendan:</h3>
                    <Carousel props={arr} />
                </div>
            </div>
        </main>
    );
}

export default HomePage;