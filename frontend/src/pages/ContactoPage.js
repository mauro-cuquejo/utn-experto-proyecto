import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/pages/ContactoPage.css'
import { useNavigate } from 'react-router-dom';

const ContactoPage = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();
    const initialForm = {
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState('');


    const handlerChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handlerSubmit = async e => {
        try {
            e.preventDefault();
            setError('');
            setMsg('');
            setSending(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/contacto`, formData);
            setSending(false);
            setMsg(response.data.message);
            if (response.data.error === false) {
                setFormData(initialForm);
            } else {
                throw new Error(response.status);
            }
        } catch (e) {
            setError('Error al intentar enviar correo.' + e.response.data.message);
        }
    }
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
                <form onSubmit={handlerSubmit} className="formulario">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <p>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handlerChange} />
                    </p>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handlerChange} />
                    </p>
                    <p>
                        <label htmlFor="telefono">Telefono</label>
                        <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handlerChange} />
                    </p>
                    <p>
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea id="mensaje" name="mensaje" value={formData.mensaje} onChange={handlerChange} />
                    </p>
                    {sending && <p>Enviando...</p>}
                    {msg && <p>{msg}</p>}
                    <p className="acciones">
                        <input type="submit" value="Enviar" />
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