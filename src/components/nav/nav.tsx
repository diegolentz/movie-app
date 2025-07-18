import './nav.css';

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
                    <a href="/">Home</a>
                    <a href="/movies">Movies</a>
                    <a href="/series">Series</a>
                </div>
            </div>
        </nav>
    );
}