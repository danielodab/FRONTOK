import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao conectar com o servidor');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.Token);
      navigate('/home');

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="img-login">
      <div className="container">
        <div className="form-box">
          <h2 className="form-titulo">Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form-button" onClick={handleLogin}>Entrar</button>
          <button className="form-button register-button" onClick={() => navigate('/register')}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}
