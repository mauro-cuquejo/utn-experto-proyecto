import { useState } from 'react';
import '../styles/pages/LoginPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlerCambioUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlerCambioPassword = (event) => {
        setPassword(event.target.value);
    }

    const handlerSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/admin/login', {
                username,
                password,
                withCredentials: true
            });
            console.log(response.status)
            //verificar el resultado de la response:
            if (response.status === 201) {
                navigate('/');
            } else {
                //acá revisar si puedo reutilizar el mensaje que viene desde el backend. Igual mejor no usarlo.
                setError('Error en la autenticación');
            }
        } catch (error) {
            setError('Error en la solicitud');
        }
    };

    return (
        <main className="holder login">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="container">
                <div className="row" margin="200px 0;">
                    <div className="col">
                        <form onSubmit={handlerSubmit}>
                            <div className="form-group">
                                <input type="text" value={username} className="form-control" placeholder="Usuario" name="username" onChange={handlerCambioUsername} />
                            </div>
                            <div className="form-group">
                                <input type="password" value={password} className="form-control" placeholder="Password" name="password" onChange={handlerCambioPassword} />
                            </div>
                            <button type="submit" className="btn btn-primary">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );

}

export default LoginPage;