// import React, { useEffect, useState } from 'react';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import './Home.css';

// const Home = () => {
//     const [usuariosAtivos, setUsuariosAtivos] = useState(0);
//     const [totalLocais, setTotalLocais] = useState(0);
//     const [locais, setLocais] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchUsuariosAtivos = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/usuarios/true');
//                 if (!response.ok) {
//                     throw new Error('Erro ao carregar usuários ativos');
//                 }
//                 const data = await response.json();
//                 setUsuariosAtivos(data.total);
//             } catch (error) {
//                 console.error('Erro:', error);
//                 setError(error.message);
//             }
//         };

//         const fetchTotalLocais = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/local/localTotal');
//                 if (!response.ok) {
//                     throw new Error('');
//                 }
//                 const data = await response.json();
//                 setTotalLocais(data.Total);
//             } catch (error) {
//                 console.error('Erro:', error);
//                 setError(error.message);
//             }
//         };

//         const fetchLocais = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/local/local');
//                 if (!response.ok) {
//                     throw new Error('');
//                 }
//                 const data = await response.json();
//                 setLocais(data);
//             } catch (error) {
//                 console.error('Erro:', error);
//                 setError(error.message);
//             }
//         };

//         fetchUsuariosAtivos();
//         fetchTotalLocais();
//         fetchLocais();
//     }, []);

//     return (
//         <div>
//             <Header />
//             <main className="main-content">
//                 <h1 className="title">Estatísticas do Sistema</h1>

//                 {error && <p className="error-message">{error}</p>}

//                 <div className="cards-container">
//                     <div className="card">
//                         <h3>Usuários Ativos</h3>
//                         <p>{usuariosAtivos}</p>
//                     </div>
//                     <div className="card">
//                         <h3>Locais Cadastrados</h3>
//                         <p>{totalLocais}</p>
//                     </div>
//                 </div>

//                 <h2 className="sub-title">Lista de Locais</h2>
//                 <div className="locais-lista">
//                     {locais.length > 0 ? (
//                         <ul className="destinos-list">
//                             {locais.map((local) => (
//                                 <li key={local.id_local} className="destinos-item">
//                                     <h3>{local.nome_local}</h3>
//                                     <p>{local.descricao_local}</p>
//                                     <p>{local.logradouro_local}, {local.cidade_local} - {local.estado_local}</p>
//                                     <p>CEP: {local.cep_local}</p>
//                                     <p>Lat: {local.latitude_local}, Lon: {local.longitude_local}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>Nenhum local cadastrado.</p>
//                     )}
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Home.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MarcadoresMapa } from '../../components/MarcadorMapa/marcadores-mapa';

const Home = () => {
    const [usuariosAtivos, setUsuariosAtivos] = useState(0);
    const [totalLocais, setTotalLocais] = useState(0);
    const [locais, setLocais] = useState([]); // Estado para armazenar todos os locais
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

    return (
        <div>
            <Header />
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
            <Footer />
        </div>
    );
};

export default Home;

