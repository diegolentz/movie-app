import type { CardGenericHome } from '../../../models/CardPelicula/cardGenericHome';
import './cardPelicula.css'

export const CardContenido = ({ contenido }: { contenido: CardGenericHome }) => {
    return (
        <div className="cardPelicula">
            <img className='imgContenido' src={`https://image.tmdb.org/t/p/w500${contenido.img}`} alt={contenido.title} />
            <p>{contenido.title}</p>
            <div className="popularityGeneric">{contenido.average.toFixed(1)}</div>
        </div>
    );
}