import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './EditarDestino.css';
import backgroundImage from '../../assets/viagem.jpg';

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

  const fetchAddressByCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error('Erro ao buscar o endereço');
      }
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado!');
        return;
      }

      const geoResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${data.logradouro},${data.localidade},${data.uf},Brasil&key=11aead7a975e45179c8ca04bb28a674e`
      );
      const geoData = await geoResponse.json();
      const location = geoData.results[0]?.geometry;

      if (!location) {
        alert('Não foi possível obter as coordenadas.');
        return;
      }

      setDestinos(prevState => ({
        ...prevState,
        logradouro_local: data.logradouro,
        cidade_local: data.localidade,
        estado_local: data.uf,
        latitude_local: location.lat,
        longitude_local: location.lng
      }));
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      alert('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
    }
  };

  const fetchAddressByCoordinates = async (latitude, longitude) => {
    try {
      const geoResponse = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=11aead7a975e45179c8ca04bb28a674e`
      );
      const geoData = await geoResponse.json();
      const address = geoData.results[0]?.components;

      if (!address) {
        alert('Não foi possível encontrar o endereço com as coordenadas fornecidas.');
        return;
      }

      setDestinos(prevState => ({
        ...prevState,
        logradouro_local: address.road || '',
        cidade_local: address.city || address.town || '',
        estado_local: address.state || '',
        cep_local: address.postcode || ''
      }));
    } catch (error) {
      console.error('Erro ao buscar o endereço pelas coordenadas:', error);
      alert('Erro ao buscar o endereço pelas coordenadas.');
    }
  };

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
    <div className="img-background">
      <div className="div">
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
              name="cep_local"
              placeholder="CEP"
              value={destinos.cep_local}
              onChange={handleChange}
              className="input-field"
            />
            <button type="button" onClick={() => fetchAddressByCep(destinos.cep_local)}>
              Buscar Endereço por CEP
            </button>

            <input
              type="text"
              name="latitude_local"
              placeholder="Latitude"
              value={destinos.latitude_local}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="longitude_local"
              placeholder="Longitude"
              value={destinos.longitude_local}
              onChange={handleChange}
              className="input-field"
            />
            <button type="button" onClick={() => fetchAddressByCoordinates(destinos.latitude_local, destinos.longitude_local)}>
              Buscar Endereço por Coordenadas
            </button>

            <input
              type="text"
              name="logradouro_local"
              placeholder="Logradouro"
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

            <button type="submit">Atualizar</button>
          </form>
        </main>
        <Footer />
      </div>
    </div>
  );
}
