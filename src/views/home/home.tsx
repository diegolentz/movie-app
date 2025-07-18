import { use, useEffect, useState } from 'react';
import { Nav } from '../../components/nav/nav';
import './home.css'
import { CardContenido } from '../../components/nav/cardPelicula/cardPelicula';
import { homeService } from '../../services/HomeService';
import type { CardGenericHome } from '../../models/CardPelicula/cardGenericHome';


export const Home = () => {
    const [contenido, setContenido] = useState<CardGenericHome[]>([]);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const response = await homeService.fetchContenidoHome();
            setContenido(response);
        };

        fetchData();
    }, []);

    return (
        <>
            <Nav withSearch={false}></Nav>
            <div className="containerHome">
                {contenido.map((item) => (
                    <CardContenido key={item.id} contenido={item} />
                ))}
            </div>
        </>
    );
}