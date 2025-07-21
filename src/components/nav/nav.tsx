import './nav.css';
import { Link } from "react-router-dom";

export const Nav = ({ withSearch } : { withSearch: boolean }) => {
    return (
        <nav>
            <div className="containerNav">
                <div className="title">
                    <h3>Cine Hub</h3>
                    <img className='iconMovie' src="/movie-symbol-of-video-camera_icon-icons.com_72981.svg" alt="" />
                </div>
                {withSearch && (
                    <div className="search" >
                        <input type="text" className='searchInput' />
                        <button className='searchButton' >
                            <img className='lupaSearch' src="/loupe_86084.svg" alt="Buscar"/>
                        </button>
                    </div>
                )}
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/movies">Peliculas</Link>
                    <Link to="/series">Series</Link>
                </div>
            </div>
        </nav>
    );
}