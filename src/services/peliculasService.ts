import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import { CardPeliculaHome } from "../models/cardPelicula.Home";

class PeliculaService {
    async fetchPeliculasHome(): Promise<CardGenericHome[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlPeliculas = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlPeliculas);
        const data = res.data as { results: CardPeliculaHome[] };

        const movies = data.results.map(
            (item: any) => new CardGenericHome(
                item.id,
                item.title,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'movie'  
            )
        );
        return movies.sort(
            (a, b) => b.average - a.average
        );
    }
}

export const peliculasService = new PeliculaService();