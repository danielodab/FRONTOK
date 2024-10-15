import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importação do useNavigate
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Dashboard.css'; // Certifique-se de que o caminho esteja correto
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MarcadoresMapa } from '../../components/MarcadorMapa/marcadores-mapa';

const Dashboard = () => {
    const navigate = useNavigate(); // Inicializa o hook de navegação
    const [usuariosAtivos, setUsuariosAtivos] = useState(0);
    const [totalLocais, setTotalLocais] = useState(0);
    const [locais, setLocais] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usuariosRes, locaisTotalRes, locaisRes] = await Promise.all([
                    fetch('http://localhost:3000/usuarios/true'),
                    fetch('http://localhost:3000/local/localTotal'),
                    fetch('http://localhost:3000/local/local'),
                ]);

                if (!usuariosRes.ok) throw new Error('Erro ao carregar usuários ativos');
                if (!locaisTotalRes.ok) throw new Error('Erro ao carregar locais');
                if (!locaisRes.ok) throw new Error('Erro ao carregar locais cadastrados');

                const usuariosData = await usuariosRes.json();
                const locaisTotalData = await locaisTotalRes.json();
                const locaisData = await locaisRes.json();

                setUsuariosAtivos(usuariosData.total);
                setTotalLocais(locaisTotalData.Total);
                setLocais(locaisData);
            } catch (error) {
                console.error('Erro:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div className="img-dashboard">
            <div className="login-button-container">
                <button onClick={handleLoginRedirect} className="login-button">
                    Ir para Login
                </button>
            </div>
            <main className="main-content">
                <h1 className="title">Estatísticas do Sistema</h1>
                {error && <p className="error-message">{error}</p>}

                <div className="cards-container">
                    <div className="card">
                        <h3>Usuários Ativos</h3>
                        <p>{usuariosAtivos}</p>
                    </div>
                    <div className="card">
                        <h3>Locais Cadastrados</h3>
                        <p>{totalLocais}</p>
                    </div>
                </div>

                <h2 className="sub-title">Lista de Locais</h2>
                <div className="locais-lista">
                    {locais.length > 0 ? (
                        <ul className="destinos-list">
                            {locais.map((local) => (
                                <li key={local.id_local} className="destinos-item">
                                    <h3>{local.nome_local}</h3>
                                    <p>{local.descricao_local}</p>
                                    <p>{local.logradouro_local}, {local.cidade_local} - {local.estado_local}</p>
                                    <p>CEP: {local.cep_local}</p>
                                    <p>Lat: {local.latitude_local}, Lon: {local.longitude_local}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum local cadastrado.</p>
                    )}
                </div>

                <div className="containerMap">
                    <div className="headerContainer">
                        <h4>Mapa</h4>
                        <p>Localidades marcadas no mapa</p>
                    </div>
                    <MapContainer
                        center={[-27.747782, -48.507073]}
                        zoom={13}
                        style={{ height: '280px', width: '100%' }} // Responsividade
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MarcadoresMapa locais={locais} />
                    </MapContainer>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

