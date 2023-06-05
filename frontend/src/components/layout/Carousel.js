import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Carousel = ({ props }) => {
    const config = {
        dots: true, //para mostrar los puntos de navegación
        inifite: true, //para permitir navegación infinita
        speed: 500, //velocidad de transición en ms
        slidesToShow: 1, //para determinar cantidad de slides mostrados a la vez.
        slidesToScroll: 1, //para determinar cantidad de slides desplazados a la vez.
    };
    return (
        <Slider {...config}>
            {props.map(element => {
                return (<div key={"div_" + element.key} className='contenedor_carousel'>
                    <img src={element.src} width={element.width} alt={element.alt} />
                    {(element.opt !== '') ? <span className='testimonio cita'>{element.opt}</span> : ""}
                </div>)
            })}
        </Slider >
    );
};

export default Carousel;