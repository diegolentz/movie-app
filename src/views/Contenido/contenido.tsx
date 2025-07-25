import { useEffect, useState } from "react";
import { Nav } from "../../components/nav/nav";
import type { CardGenericHome } from "../../models/cardGenericHome";
import { useLocation } from "react-router-dom";
import { seriesService } from "../../services/seriesService";
import { peliculasService } from "../../services/peliculasService";
import { CardContenido } from "../../components/cardPelicula/cardPelicula";
import { useLoader } from "../../context/useLoader";

export const Contenido = () => {
    const [contenido, setContenido] = useState<CardGenericHome[]>([]);
    const location = useLocation();
    const isSerie = location.pathname.includes("/series");
    const { loaderInvoke } = useLoader();

    const fetchData = async () => {
        loaderInvoke(true);
        if (isSerie) {
            const series = await seriesService.fetchSeriesTendencia();
            setContenido(series);
        } else {
            const peliculas = await peliculasService.fetchPeliculasTendencia();
            setContenido(peliculas);
        }
        loaderInvoke(false);
    };

    const buscarContenido = async (titulo: string) => {
        loaderInvoke(true);
        if (titulo != "") {
            if (isSerie) {
                const res = await seriesService.searchSeries(titulo)
                setContenido(res);
            } else {
                const res = await peliculasService.searchPeliculas(titulo)
                setContenido(res);
            }
        } else {
            fetchData();
        }
        loaderInvoke(false);
    }

    useEffect(() => {

        fetchData();
    }, [isSerie, location.pathname]);

    return (
        <>
            <Nav withSearch={true} buscador={buscarContenido}></Nav>
            {contenido.length === 0 ? <h1 className='estrenosHome'>No se encontraron resultados</h1> : <h1 className='estrenosHome'>Tendencia</h1>}
            <div className="containerHome">
                {contenido.map((item) => (
                    <CardContenido key={item.id} contenido={item} />
                ))}
            </div>
        </>
    );
}
