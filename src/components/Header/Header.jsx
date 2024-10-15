import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImg from '../../assets/logogrande.png';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('Você não está logado.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('token');
            navigate('/'); 

        } else {
            const errorData = await response.json();
            console.error('Erro no logout:', errorData.message);
            alert(`Erro ao sair: ${errorData.message}`); 
        }
    } catch (error) {
        console.error('Erro ao tentar deslogar:', error);
        alert('Erro ao tentar sair. Verifique sua conexão e tente novamente.');
    }
};

  return (
    <header>
      <div className="header-logo">
        <img src={logoImg} alt="Logo" className="logo-img" />
        <div className="logo"></div>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Página Inicial</Link></li>
          <li><Link to="/destinos">Cadastrar Destino</Link></li>
          <li><Link to="/meus-destinos">Meus Destinos</Link></li>
          <li><button className='sair' onClick={handleLogout}>Sair</button></li>
        </ul>
      </nav>
    </header>
  );
}