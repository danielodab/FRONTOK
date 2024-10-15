import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export function MarcadoresMapa({ locais }) {
    const map = useMap();

    useEffect(() => {
        if (locais.length > 0 && locais[0].localizacao) {
            const { latitude, longitude } = locais[0].localizacao;

            // Verifica se as coordenadas são válidas
            if (latitude && longitude) {
                map.flyTo({ lat: latitude, lng: longitude }, 13, { animate: true });
            }
        }
    }, [locais, map]);

    return (
        <>
            {locais.map(({ id, localizacao, nome, descricao, imagem }) => (
                localizacao ? (
                    <Marker 
                        position={[localizacao.latitude, localizacao.longitude]}
                        key={id}
                    >
                        <Popup>
                            <strong>{nome}</strong>
                            <p>{descricao}</p>
                            {imagem && <img src={imagem} alt={nome} style={{ width: '100%', height: 'auto' }} />} {/* Adicionando imagem se disponível */}
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </>
    );
}