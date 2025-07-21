import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import { CardPeliculaHome } from "../models/cardPelicula.Home";
import type { DetailPelicula } from "../models/detailPelicula";
import { Actor } from "../models/actor";

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

    async fetchPeliculasAutores(id: number): Promise<Actor[]> {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=es-ES`);
        const data = response.data as { cast: Actor[] };
        const authors = data.cast.map((actor: Actor) => new Actor(
            actor.id,
            actor.name,
            actor.profile_path
        ));
        return authors;
    }

    async fetchPeliculasTendencia() {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlPeliculas = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlPeliculas);
        const data = res.data as { results: CardPeliculaHome[] };

        const movies = data.results.map((item: CardPeliculaHome) => {
            return new CardGenericHome(
                item.id,
                item.original_title,
                item.poster_path,
                item.vote_average,
                item.first_air_date,
                item.popularity,
                'movie'
            );
        });
        return movies.sort((a, b) => b.average - a.average);
    }
}

export const peliculasService = new PeliculaService();