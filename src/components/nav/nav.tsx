import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './nav.css';


export const Nav = ({ withSearch, buscador }: { withSearch: boolean, buscador: (titulo: string) => Promise<void> }) => {
    const inputRef = useRef<HTMLInputElement>(null);
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const navigate = useNavigate();

    const handleSearch = () => {
        const titulo = (inputRef.current?.value || "").trim();
        buscador(titulo.toUpperCase());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (destino: string) => {
        setAnchorEl(null);
        if (destino) {
            navigate(destino);
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
                   <div className="burger">
                    <Button
                        id="burger-button"
                        onClick={handleClick}
                        sx={{
                             borderRadius: '1rem'
                        }}
                    >
                        <MenuIcon
                            sx={{
                                fontSize: 30,
                                color: 'var(--color-font)',
                            }}
                        />
                    </Button>

                    <Menu
                        id="burger-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => handleClose("")}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            sx: {
                                width: '15rem',
                                backdropFilter: 'blur(10px)',
                                backgroundColor: 'var(--nav-color)',
                                color: 'var(--color-font)',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                mt: 1.5,
                                position: 'absolute',
                                ml: 'auto',
                                right: '0px',
                                left: 'unset',
                                border: 'var(--search-color) solid 1px',
                                borderTop: 'none',
                                zIndex: 2000,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => handleClose("/")}
                            sx={{ fontSize: '1.5rem', fontWeight: 600 }}
                        >
                            Home
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleClose("/movies")}
                            sx={{ fontSize: '1.5rem', fontWeight: 600 }}
                        >
                            Peliculas
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleClose("/series")}
                            sx={{ fontSize: '1.5rem', fontWeight: 600 }}
                        >
                            Series
                        </MenuItem>
                        
                      
                    </Menu>
                </div>

            </div>
        </nav>
    );
}