import './nav.css';
import { Link } from "react-router-dom";
import { useRef } from "react";

export const Nav = ({ withSearch, buscador }: { withSearch: boolean, buscador: (titulo: string) => Promise<void> }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        const titulo = (inputRef.current?.value || "").trim();
        buscador(titulo.toUpperCase());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <nav>
            <div className="containerNav">
                <div className="title">
                    <h3>Cine Hub</h3>
                    <img className='iconMovie' src="/movie-symbol-of-video-camera_icon-icons.com_72981.svg" alt="" />
                </div>
                {withSearch && (
                    <div className="search" >
                        <input
                            type="text"
                            className='searchInput'
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            placeholder="Buscar Peliculas o Series"
                        />
                        <button onClick={handleSearch} className='searchButton' >
                            <img className='lupaSearch' src="/loupe_86084.svg" alt="Buscar" />
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