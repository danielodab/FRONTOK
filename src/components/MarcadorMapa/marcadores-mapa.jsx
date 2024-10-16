
import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export function MarcadoresMapa({ locais, localSelecionado }) {
    const map = useMap();

    useEffect(() => {
        if (localSelecionado && localSelecionado.localizacao) {
            const { latitude, longitude } = localSelecionado.localizacao;
            if (latitude && longitude) {
                map.flyTo([latitude, longitude], 13, { animate: true });
            }
        }
    }, [localSelecionado, map]);

    return (
        <>
            {locais.map(({ id, localizacao, nome, descricao, imagem }) => (
                localizacao && localizacao.latitude && localizacao.longitude ? (
                    <Marker
                        position={[localizacao.latitude, localizacao.longitude]}
                        key={id}
                    >
                        <Popup>
                            <strong>{nome}</strong>
                            <p>{descricao}</p>
                            {/* Adiciona a imagem, se disponível */}
                            {imagem && <img src={imagem} alt={nome} style={{ width: '100%', height: 'auto' }} />}
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </>
    );
}
