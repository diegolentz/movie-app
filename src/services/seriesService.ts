import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import type { CardSerieHome } from "../models/cardSerieHome";
import type { DetailSerie } from "../models/detailSerie";
import { Actor } from "../models/actor";

class SerieService {

    async fetchSeriesHome(): Promise<CardGenericHome[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlSeries);
        const data = res.data as { results: CardSerieHome[] };

        const series = data.results.map((item: CardSerieHome) => {
            return new CardGenericHome(
                item.id,
                item.original_name,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'tv'
            );
        });
        return series.sort((a, b) => b.average - a.average);
    }

    async getDetalle(id: string): Promise<DetailSerie> {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es-ES`);
        return response.data as DetailSerie;
    }

    async fetchSeriesAutores(id: number): Promise<Actor[]> {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=es-ES`);
        const data = response.data as { cast: Actor[] };
        const authors = data.cast.map((actor: Actor) => new Actor(
            actor.id,
            actor.name,
            actor.profile_path
        ));
        return authors;
    }

    async fetchSeriesTendencia() {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlSeries);
        const data = res.data as { results: CardSerieHome[] };

        const series = data.results.map((item: CardSerieHome) => {
            return new CardGenericHome(
                item.id,
                item.original_name,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'tv'
            );
        });
        return series.sort((a, b) => b.average - a.average);
    }
}

export const seriesService = new SerieService();