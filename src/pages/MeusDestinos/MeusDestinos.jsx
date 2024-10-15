import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './MeusDestinos.css';

export default function MeusDestinos() {
    const [destinos, setDestinos] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                const response = await fetch('http://localhost:3000/local/localuser', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao carregar os destinos');
                }
                const data = await response.json();
                setDestinos(data);
            } catch (error) {
                console.error('Erro ao carregar os destinos:', error);
            }
        };

        fetchDestinos();
    }, [token]);

    const handleEdit = (id) => {
        navigate(`/editar-destino?id=${id}`);
    };    

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/local/local/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao excluir o destino');
            }
    
            setDestinos(destinos.filter(destino => destino.id_local !== id));
            alert('Destino excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir o destino:', error);
            alert('Erro ao excluir o destino');
        }
    };
    
    return (
        <div>
            <Header />
            <main className="main-destinations">
                <h1 className="destinations-title">Meus Destinos</h1>
                <ul className="destinations-list">
                    {destinos.map(destino => (
                        <li key={destino.id_local} className="destination-item">
                            <h3 className="destination-name">{destino.nome_local}</h3>
                            <p className="destination-info">Rua: {destino.logradouro_local}</p>
                            <p className="destination-info">Cidade: {destino.cidade_local}, {destino.estado_local}</p>
                            <button onClick={() => handleEdit(destino.id_local)} className="edit-button">Editar</button>
                            <button onClick={() => handleDelete(destino.id_local)} className="delete-button">Excluir</button>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </div>
    );
}

