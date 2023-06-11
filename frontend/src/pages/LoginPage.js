import { useState } from 'react';
import '../styles/pages/LoginPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser, loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handlerCambioUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlerCambioPassword = (event) => {
        setPassword(event.target.value);
    }

    const handlerSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {
                username,
                password,
            });

            //verificar el resultado de la response:
            if (response.status === 201) {
                setLoggedIn(true);
                setUser(username);
                navigate("/")
            } else {
                //acá revisar si puedo reutilizar el mensaje que viene desde el backend. Igual mejor no usarlo.
                setError('Error en la autenticación');
                setUser(undefined);
                setLoggedIn(false);
            }
        } catch (e) {
            setError('Error en la solicitud: ' + e.response.data.message);
            setUser(undefined);
            setLoggedIn(false);
        }
    };

    return (
        <main className="holder login">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="container">
                <div className="row" margin="200px 0;">
                    <div className="col">
                        <form className="formulario" onSubmit={handlerSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario:</label>
                                <input type="text" value={username} className="form-control" placeholder="Usuario" name="username" onChange={handlerCambioUsername} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" value={password} className="form-control" placeholder="Password" name="password" onChange={handlerCambioPassword} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Entrar</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );




}

export default LoginPage;