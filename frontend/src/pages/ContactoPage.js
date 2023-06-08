import { useEffect } from 'react';
import '../styles/pages/ContactoPage.css'
import { useNavigate } from 'react-router-dom';

const ContactoPage = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const cargarContactoPage = async () => {
            if (!loggedIn) {
                navigate('/login')
            }
        }
        cargarContactoPage();
    }, [loggedIn, navigate]);
    return (
        <main className="holder contacto">
            <div>
                <h2>Contacto Rápido</h2>
                <form action="" method="" className="formulario">
                    <p>
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" />
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email" />
                    </p>
                    <p>
                        <label for="telefono">Telefono</label>
                        <input type="text" id="telefono" name="telefono" />
                    </p>
                    <p>
                        <label for="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje"></textarea>
                    </p>
                    <p className="acciones">
                        <input type="submit" value={"Enviar"} />
                    </p>
                </form>
            </div>
            <div className="datos">
                <h2>Otras vías de comunicación</h2>
                <p>Si tenés dudas o necesitás consultar algo, no dudes comunicarte con nosotros por estos medios (si de paso nos seguís, no nos quejamos)</p>
                <ul>
                    <li>Teléfono: 123123</li>
                    <li>Email: contacto@printered.com.ar</li>
                    <li>Facebook: printered_ok</li>
                    <li>Twitter: @printered</li>
                    <li>Skype: @printered</li>
                </ul>
            </div>
        </main>
    );

}

export default ContactoPage;