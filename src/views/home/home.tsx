import { useEffect, useState } from 'react';
import { CardContenido } from '../../components/cardPelicula/cardPelicula';
import { Nav } from '../../components/nav/nav';
import type { CardGenericHome } from '../../models/cardGenericHome';
import { peliculasService } from '../../services/peliculasService';
import { seriesService } from '../../services/seriesService';
import './home.css';


export const Home = () => {
    const [contenido, setContenido] = useState<CardGenericHome[]>([]);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const peliculas = await peliculasService.fetchPeliculasHome();
            const series = await seriesService.fetchSeriesHome();
            const contenidoOrdenado = [...peliculas, ...series].sort((a, b) => b.average - a.average);
            setContenido(contenidoOrdenado);
        };

        fetchData();
    }, []);

    return (
        <>
            <Nav withSearch={false}></Nav>
                <h1 className='estrenosHome'>Proximos Estrenos</h1>
            <div className="containerHome">
                {contenido.map((item) => (
                    <CardContenido key={item.id} contenido={item} />
                ))}
            </div>
        </>
    );
}