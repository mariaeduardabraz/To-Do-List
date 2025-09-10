import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    // Hooks useState para controlar os campos do formulário
    const [username, setUsername] = useState('usuario'); // Preenchido para facilitar o teste
    const [password, setPassword] = useState('123'); // Preenchido para facilitar o teste
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            login(response.data.accessToken); // Chama a função do contexto para salvar o token
            navigate('/'); // Navega para a página principal
        } catch (err) {
            setError('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <div className="form-group">
                    <label>Usuário:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;