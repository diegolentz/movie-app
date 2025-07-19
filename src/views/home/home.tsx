import { use, useEffect, useState } from 'react';
import { Nav } from '../../components/nav/nav';
import './home.css'
import { homeService } from '../../services/HomeService';
import { CardContenido } from '../../components/cardPelicula/cardPelicula';
import type { CardGenericHome } from '../../models/cardGenericHome';


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
                <h1 className='estrenosHome'>Estrenos</h1>
            <div className="containerHome">
                {contenido.map((item) => (
                    <CardContenido key={item.id} contenido={item} />
                ))}
            </div>
        </>
    );
}