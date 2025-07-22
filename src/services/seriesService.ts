import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import type { CardSerieHome } from "../models/cardSerieHome";
import type { DetailSerie } from "../models/detailSerie";
import { Actor } from "../models/actor";
import { Trailer } from "../models/trailer";

class SerieService {

    async fetchSeriesHome(): Promise<CardGenericHome[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlSeries);
        const data = res.data as { results: CardSerieHome[] };

        const series = data.results.map((item: CardSerieHome) => {
            return new CardGenericHome(
                item.id,
                item.name,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'tv',
                item.overview
            );
        });
        const filterSeries = series.filter(item => item.overview !== null && item.overview !== undefined && item.overview.trim() !== "");
        return filterSeries.sort((a, b) => b.average - a.average);
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
            actor.profile_path,
            actor.popularity
        ));

        const filteredAuthors = authors.filter(actor => actor.profile_path !== null && actor.profile_path !== undefined);
        const principales = filteredAuthors
            .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
            .slice(0, 10);
        return principales;
    }

    async fetchSeriesTendencia() {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlSeries = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlSeries);
        const data = res.data as { results: CardSerieHome[] };

        const series = data.results.map((item: CardSerieHome) => {
            return new CardGenericHome(
                item.id,
                item.name,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'tv',
                item.overview
            );
        });
        const filterSeries = series.filter(item => item.overview !== null && item.overview !== undefined && item.overview.trim() !== "");
        return filterSeries.sort((a, b) => b.average - a.average);
    }

    async searchSeries(titulo: string): Promise<CardGenericHome[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=es-ES&query=${titulo}&page=1`;
        const res = await axios.get(url);
        const data = res.data as { results: CardSerieHome[] };

        const series = data.results.map((item: CardSerieHome) => {
            return new CardGenericHome(
                item.id,
                item.name,
                item.poster_path,
                Number(item.vote_average),
                item.first_air_date,
                item.popularity,
                'tv',
                item.overview
            );
        });
        const filterSeries = series.filter(item => item.overview !== null && item.overview !== undefined && item.overview.trim() !== "");
        return filterSeries.sort((a, b) => b.average - a.average);
    }

    async fetchSeriesTrailers(id: string): Promise<Trailer[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=es-ES`);
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

export const seriesService = new SerieService();