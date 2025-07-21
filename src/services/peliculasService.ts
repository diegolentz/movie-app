import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import { CardPeliculaHome } from "../models/cardPelicula.Home";
import type { DetailPelicula } from "../models/detailPelicula";

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

    async getDetalle(id: string): Promise<DetailPelicula> {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`);
        return response.data as DetailPelicula;
    }

    async fetchPeliculasAutores(id: number): Promise<any> {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`);
        console.log("Autores Response:", response.data);
    }
}

export const peliculasService = new PeliculaService();