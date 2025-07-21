import { useNavigate } from 'react-router-dom';
import './cardPelicula.css'
import type { CardGenericHome } from '../../models/cardGenericHome';


export const CardContenido = ({ contenido }: { contenido: CardGenericHome }) => {
    const nav = useNavigate();

    return (
        <div className="cardPelicula">
            <img
            className='imgContenido'
            src={`https://image.tmdb.org/t/p/w500${contenido.img}`}
            alt={contenido.title}
            style={{ cursor: 'pointer' }}
            onClick={() => nav(`/${contenido.type}/${contenido.id}`)}
            />
            <p>{contenido.title}</p>
            <div className="popularityGeneric">{contenido.average.toFixed(1)}</div>
        </div>
    );
}