import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import { CardPeliculaHome } from "../models/cardPelicula.Home";
import type { DetailPelicula } from "../models/detailPelicula";
import { Actor } from "../models/actor";
import { Trailer } from "../models/trailer";

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
                'movie',
                item.overview
            )
        );
        const filteredMovies = movies.filter(item => item.overview !== null && item.overview !== undefined && item.overview.trim() !== "");
        return filteredMovies.sort((a, b) => b.average - a.average);
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
            actor.profile_path,
            actor.popularity
            
        ));
        const filteredAuthors = authors.filter(actor => actor.profile_path !== null && actor.profile_path !== undefined);
        const principales = filteredAuthors
            .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
            .slice(0, 10);
        return principales;
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
                'movie',
                item.overview
            );
        });
        const filteredMovies = movies.filter(item => item.overview !== null && item.overview !== undefined && item.overview.trim() !== "");
        return filteredMovies.sort((a, b) => b.average - a.average);
    }

    async searchPeliculas(titulo: string): Promise<CardGenericHome[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${titulo}&page=1`;
        const res = await axios.get(url);
        const data = res.data as { results: CardPeliculaHome[] };

        const movies = data.results.map((item: CardPeliculaHome) => {
            return new CardGenericHome(
                item.id,
                item.original_title,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'movie',
                item.overview
            );
        });
        const filteredMovies = movies.filter(item => item.overview !== null && item.overview !== undefined && item.overview.trim() !== "");
        return filteredMovies.sort((a, b) => b.average - a.average);
    }

    async fetchPeliculasTrailers(id: string): Promise<Trailer[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=es-ES`);
        const datos = response.data as { results: Trailer[] };
        const filteredTrailers = datos.results.filter((video: Trailer) => video.type === "Trailer" && video.site === "YouTube");
        console.log("Trailers", filteredTrailers);
        return filteredTrailers.map((video: Trailer) => new Trailer(
            video.id,
            video.key,
            video.type,
            video.site
        ));
    }
}

export const peliculasService = new PeliculaService();