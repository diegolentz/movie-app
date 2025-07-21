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
    }, [isSerie]);

    return (
        <>
            <Nav withSearch={true}></Nav>
               <h1 className='estrenosHome'>Tendencia</h1>
                       <div className="containerHome">
                           {contenido.map((item) => (
                               <CardContenido key={item.id} contenido={item} />
                           ))}
                       </div>
                   </>
    );
}
