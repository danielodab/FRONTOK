import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './EditarDestino.css';

export default function EditarDestino() {
  const [destinos, setDestinos] = useState({
    nome_local: '',
    descricao_local: '',
    latitude_local: '',
    longitude_local: '',
    logradouro_local: '',
    cidade_local: '',
    estado_local: '',
    cep_local: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchDestino = async () => {
      try {

        const response = await fetch(`http://localhost:3000/local/local/${id}`, {
          headers: {
            'Authorization': `${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Erro ao carregar o destino');
        }
        const data = await response.json();
        
        setDestinos(data);
      } catch (error) {
        console.error('Erro ao carregar o destino:', error);
      }
    };

    if (id) {
      fetchDestino();
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestinos((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    
      const response = await fetch(`http://localhost:3000/local/local/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(destinos),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o destino');
      }

      alert('Destino atualizado com sucesso!');
      navigate('/meus-destinos');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar o destino');
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Editar Destino</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome_local"
            placeholder="Nome do Destino"
            value={destinos.nome_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="descricao_local"
            placeholder="Descrição"
            value={destinos.descricao_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="latitude_local"
            placeholder="Latitude"
            value={destinos.latitude_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="longitude_local"
            placeholder="Longitude"
            value={destinos.longitude_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="logradouro_local"
            placeholder="Rua"
            value={destinos.logradouro_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cidade_local"
            placeholder="Cidade"
            value={destinos.cidade_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="estado_local"
            placeholder="Estado"
            value={destinos.estado_local}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cep_local"
            placeholder="CEP"
            value={destinos.cep_local}
            onChange={handleChange}
            required
          />
          <button type="submit">Atualizar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
