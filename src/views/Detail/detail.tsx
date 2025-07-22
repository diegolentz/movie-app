import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Nav } from "../../components/nav/nav";
import { detailPeliculaFromGeneric, type DetailPelicula } from "../../models/detailPelicula";
import { detailSerieFromGeneric, type DetailSerie } from "../../models/detailSerie";
import { peliculasService } from "../../services/peliculasService";
import { seriesService } from "../../services/seriesService";
import "./detail.css";
import type { Actor } from "../../models/actor";
import type { Trailer } from "../../models/trailer";

export const Detail = () => {
    const params = useParams();
    const location = useLocation();
    const type = location.pathname.includes('/movie') ? 'movie' : 'tv';
    const isMovie = type === 'movie';
    const [detail, setDetail] = useState<DetailSerie | DetailPelicula>(detailPeliculaFromGeneric({}));
    const [actors, setActors] = useState<Actor[]>([]);
    const [trailers, setTrailers] = useState<Trailer[]>([]);

    useEffect(() => {
        const fetchDetail = async () => {
            if (isMovie) {
                const data = await peliculasService.getDetalle(String(params.id));
                const res = await peliculasService.fetchPeliculasTrailers(String(params.id));
                setDetail(detailSerieFromGeneric(data));
                setTrailers(res);
            } else {
                const data = await seriesService.getDetalle(String(params.id));
                const res = await seriesService.fetchSeriesTrailers(String(params.id));
                setDetail(detailSerieFromGeneric(data));
                setTrailers(res);
            }
            console.log("trailers", trailers);

        };
        fetchDetail();
    }, [params.id, type, isMovie]);

    useEffect(() => {
        const fetchAutores = async () => {
            if (detail.id !== undefined && detail.id !== null) {
                if (isMovie) {
                    const autores = await peliculasService.fetchPeliculasAutores(detail.id);
                    setActors(autores);
                } else {
                    const autores = await seriesService.fetchSeriesAutores(detail.id);
                    setActors(autores);
                }
            }
        };
        fetchAutores();
    }, [detail.id, isMovie]);

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
            <>{arr.map(g => <p key={g.name} className="chip">{g.name}</p>)}</>
        ) : "No disponible";

    // Datos específicos
    const tagline = 'tagline' in detail ? detail.tagline : undefined;
    const overview = detail.overview || "Sin sinopsis disponible.";
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
            <Nav withSearch={false} buscador={async () => { }} />
            <div className="containerDetalleView">
                <h1 className="tituloDetailView">Detalle de {isMovie ? 'Película' : 'Serie'}</h1>

                <div className="cardDetalle">

                    <div className="containerImgDetail">
                        <img className="imgDetail"
                            src={imgSrc}
                            alt={mainTitle}
                        />
                    </div>

                    <div className="containerDescripcion">
                        <div className="tituloDetalle">
                            <h1 className="tituloDetail">{mainTitle}</h1>
                            {tagline && <p className="taglineDetail">{tagline}</p>}
                        </div>
                        <div className="datosClave">
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
                                    <b>Transmisión: {networks}</b>
                                </>
                            )}

                            <b>Puntaje promedio: {voteAverage}</b>
                            <b>Idiomas hablados: {spokenLanguages}</b>
                        </div>
                        <div className="sinopsisDetail">
                            <h2 className="h2Sinopsis">Sinopsis:</h2>
                            <p className="pOverview">{overview}</p>
                        </div>

                        <div className="chips">{getGenresChips(detail.genres)}</div>
                    </div>
                </div>

                <h2 className="h2Autores">Actores Principales</h2>
                <div className="containerAutores">

                    {actors.length > 0 ? (
                        actors.map(actor => (
                            <div key={actor.id} className="cardActor">
                                <img
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "/placeholder.jpg"}
                                    alt={actor.name}
                                    className="imgActor"
                                />
                                <p className="nombreActor">{actor.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay actores disponibles.</p>
                    )}
                </div>
                {trailers.length > 0 && (
                    <>
                        <h2>Trailers</h2>
                        <div className="trailersContainer">
                            {trailers
                                .filter((trailer) => trailer.site === "YouTube" && trailer.type === "Trailer")
                                .map((trailer) => (
                                    <div key={trailer.id} className="trailerCard">
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                frameBorder="0"
                                allowFullScreen
                                className="trailerVideo"></iframe>
                        </div>
                    ))}
            </div>
                    </>
                )}
            </div>


        </>
    );
}