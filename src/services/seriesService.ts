import axios from "axios";
import { CardGenericHome } from "../models/cardGenericHome";
import type { CardSerieHome } from "../models/cardSerieHome";

class SerieService {
    async fetchSeriesHome(): Promise<CardGenericHome[]> {
        const apiKey = import.meta.env.VITE_API_KEY as string;
        const urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=es-ES&page=1`;
        const res = await axios.get(urlSeries);
        const data = res.data as { results: CardSerieHome[] };
       
       const series = data.results.map((item: CardSerieHome) => {
            return new CardGenericHome(
                item.id,
                item.original_title,
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