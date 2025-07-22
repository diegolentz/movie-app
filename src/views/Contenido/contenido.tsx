import { useEffect, useState } from "react";
import { Nav } from "../../components/nav/nav";
import type { CardGenericHome } from "../../models/cardGenericHome";
import { useLocation } from "react-router-dom";
import { seriesService } from "../../services/seriesService";
import { peliculasService } from "../../services/peliculasService";
import { CardContenido } from "../../components/cardPelicula/cardPelicula";

export const Contenido = () => {
    const [contenido, setContenido] = useState<CardGenericHome[]>([]);
    const location = useLocation();
    const isSerie = location.pathname.includes("/series");

    const buscarContenido = async (titulo : string) => {
        if (isSerie) {
            const res = await seriesService.searchSeries(titulo)
            setContenido(res);
        } else {
            const res = await peliculasService.searchPeliculas(titulo)
            setContenido(res);
        }
    }

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            if (isSerie) {
                const series = await seriesService.fetchSeriesTendencia();
                setContenido(series);
            } else {
                const peliculas = await peliculasService.fetchPeliculasTendencia();
                setContenido(peliculas);
            }
        };

        fetchData();
    }, [isSerie, location.pathname]);

    return (
        <>
            <Nav withSearch={true} buscador={buscarContenido}></Nav>
               <h1 className='estrenosHome'>Tendencia</h1>
                       <div className="containerHome">
                           {contenido.map((item) => (
                               <CardContenido key={item.id} contenido={item} />
                           ))}
                       </div>
                   </>
    );
}
