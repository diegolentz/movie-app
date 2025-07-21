import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Nav } from "../../components/nav/nav";
import { detailPeliculaFromGeneric, type DetailPelicula } from "../../models/detailPelicula";
import { detailSerieFromGeneric, type DetailSerie } from "../../models/detailSerie";
import { detalleService } from "../../services/DetalleService";
import "./detail.css";

export const Detail = () => {
    const params = useParams();
    const location = useLocation();
    const type = location.pathname.includes('/movie') ? 'movie' : 'tv';
    const isMovie = type === 'movie';
    const [detail, setDetail] = useState<DetailSerie | DetailPelicula>(detailPeliculaFromGeneric({}));

    useEffect(() => {
        const fetchDetail = async () => {
            if (params.id) {
                const data = await detalleService.getDetalle(String(params.id), type);
                if (isMovie) {
                    setDetail(detailPeliculaFromGeneric(data));
                } else {
                    setDetail(detailSerieFromGeneric(data));
                }
            }
        };
        fetchDetail();
    }, [params.id, type]);

    const mainTitle = isMovie
        ? ('title' in detail ? detail.title : '')
        : ('name' in detail ? detail.name : '');

    const imgSrc = detail.poster_path
        ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
        : "/placeholder.jpg";

    // Utilidades para mostrar listas
    const getLangs = (arr?: Array<{ english_name: string }>) => arr?.map(x => x.english_name).join(', ') || "No disponible";
    const getNetworks = (arr?: Array<{ name: string }>) => arr?.map(x => x.name).join(', ') || "No disponible";
    const getCreators = (arr?: Array<{ name: string }>) => arr?.map(x => x.name).join(', ') || "No disponible";
    const getGenresChips = (arr?: Array<{ name: string }>) =>
        arr?.length ? (
            <div className="chips">{arr.map(g => <p key={g.name} className="chip">{g.name}</p>)}</div>
        ) : "No disponible";

    // Datos específicos
    const tagline = 'tagline' in detail ? detail.tagline : undefined;
    const overview = detail.overview || "Sin sinopsis disponible.";
    const genres = getGenresChips(detail.genres);
    const spokenLanguages = getLangs(detail.spoken_languages as any);

    // Movie
    const releaseDate = isMovie ? ('release_date' in detail ? detail.release_date : undefined) : undefined;
    const runtime = isMovie ? ('runtime' in detail ? detail.runtime : undefined) : undefined;

    // Serie
    const firstAir = !isMovie ? ('first_air_date' in detail ? detail.first_air_date : undefined) : undefined;
    const lastAir = !isMovie ? ('last_air_date' in detail ? detail.last_air_date : undefined) : undefined;
    const seasons = !isMovie ? ('number_of_seasons' in detail ? detail.number_of_seasons : undefined) : undefined;
    const episodes = !isMovie ? ('number_of_episodes' in detail ? detail.number_of_episodes : undefined) : undefined;
    const episodeRunTime = !isMovie ? ('episode_run_time' in detail && detail.episode_run_time?.length ? detail.episode_run_time[0] : undefined) : undefined;
    const creators = !isMovie ? getCreators((detail as DetailSerie).created_by as any) : undefined;
    const networks = !isMovie ? getNetworks((detail as DetailSerie).networks as any) : undefined;

    // Puntuación
    const voteAverage = detail.vote_average ? detail.vote_average.toFixed(1) : "No disponible";

    return (
        <>
            <Nav withSearch={false} />
            <div className="containerDetalleView">
                <h1 className="tituloDetailView">Detalle de {isMovie ? 'Película' : 'Serie'}</h1>
                <div className="cardDetalle">
                    <img className="imgDetail"
                        src={imgSrc}
                        alt={mainTitle}
                    />
                    <div className="tituloDetalle">
                        <h1 className="tituloDetail">{mainTitle}</h1>
                        {tagline && <p className="taglineDetail">{tagline}</p>}
                    </div>
                    <div className="genresDetail">{genres}</div>

                    <section className="datosClave">
                        {isMovie ? (
                            <>
                                <b>Fecha de estreno:  {releaseDate || "No disponible"}</b>
                                <b>Duración: {runtime ? `${runtime} min` : "No disponible"}</b>

                            </>
                        ) : (
                            <>
                                <b>Primera emisión: {firstAir || "No disponible"}</b>
                                <b>Última emisión: {lastAir || "No disponible"}</b>
                                <b>Temporadas: {seasons || "No disponible"}</b>
                                <b>Episodios: {episodes || "No disponible"}</b>
                                <b>Duración episodio: {episodeRunTime ? `${episodeRunTime} min` : "No disponible"}</b>
                                <b>Creador/es: {creators}</b>
                                <b>Redes: {networks}</b>
                            </>
                        )}

                        <b>Puntaje promedio: {voteAverage}</b>
                        <b>Idiomas hablados: {spokenLanguages}</b>
                        <h2>Sinopsis:</h2>
                        <p>{overview}</p>

                    </section>

                </div>
            </div>
        </>
    );
};