import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MarcadoresMapa } from '../../components/MarcadorMapa/marcadores-mapa';
import backgroundImage from '../../assets/viagem.jpg';

const Dashboard = () => {
    const navigate = useNavigate();
    const [usuariosAtivos, setUsuariosAtivos] = useState(0);
    const [totalLocais, setTotalLocais] = useState(0);
    const [locais, setLocais] = useState([]);
    const [error, setError] = useState('');
    const [localSelecionado, setLocalSelecionado] = useState(null); 

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

                const locaisTransformados = locaisData.map((local) => ({
                    id: local.id_local,
                    nome: local.nome_local,
                    descricao: local.descricao_local,
                    imagem: local.imagem_local || null,
                    localizacao: local.latitude_local && local.longitude_local ? {
                        latitude: local.latitude_local,
                        longitude: local.longitude_local
                    } : null
                }));

                setLocais(locaisTransformados);
            } catch (error) {
                console.error('Erro:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    const handleLocalClick = (local) => {
        if (local.localizacao) { 
            setLocalSelecionado(local);
        }
    };

    return (
        <div className="img-dashboard">
            <div className="login-button-container">
                <button onClick={handleLoginRedirect} className="login-button">
                    Ir para Login
                </button>
            </div>
            <main className="main-content-dashboard ">
                <h1 className="title">VIAGEM365</h1>
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

                <div className="containerMap">
                    <div className="headerContainer">
                        <h4 className="TitttleMap">Mapa</h4>
                        <p className="DsTitttleMap">Localidades marcadas no mapa</p>
                    </div>
                    <MapContainer
                        center={[-27.747782, -48.507073]}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {locais.length > 0 && <MarcadoresMapa locais={locais} localSelecionado={localSelecionado} />}
                    </MapContainer>
                </div>

                <h2 className="sub-title">Lista de Locais</h2>
                <div className="locais-lista">
                    {locais.length > 0 ? (
                        <ul className="destinos-list">
                            {locais.map((local) => (
                                <li
                                    key={local.id}
                                    className="destinos-item"
                                    onClick={() => handleLocalClick(local)}
                                    style={{ cursor: 'pointer', width: 'calc(50% - 10px)', margin: '5px' }} 
                                >
                                    <h3>{local.nome}</h3>
                                    <p>{local.descricao}</p>
                                    <p>Lat: {local.localizacao.latitude}, Lon: {local.localizacao.longitude}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum local cadastrado.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
