import axios from 'axios';
import { CardPeliculaHome } from '../models/cardPelicula.Home';
import type { CardGenericHome } from '../models/cardGenericHome';
import { CardSerieHome } from '../models/cardSerieHome';


class HomeService {
  async fetchContenidoHome(): Promise<CardGenericHome[]> {
    const apiKey = import.meta.env.VITE_API_KEY as string;
    const urlMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`;
    const urlSeries = `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=es-ES&page=1`;

    const [moviesRes, seriesRes] = await Promise.all([
      axios.get(urlMovies),
      axios.get(urlSeries)
    ]);

    const movies = moviesRes.data.results.map(
      (item: any) => new CardPeliculaHome(
        item.id,
        item.title,
        item.poster_path,
        item.vote_average,
        item.first_air_date,
        item.popularity
      )
    );

    const series = seriesRes.data.results.map(
      (item: any) => new CardSerieHome(
        item.id,
        item.name,
        item.poster_path,
        item.vote_average,
        item.first_air_date,
        item.popularity
      )
    );

    const allCards = [...movies, ...series].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    console.log("ENV:", import.meta.env);
    console.log("API KEY:", import.meta.env.VITE_API_KEY);
    return allCards.map(card => card.toGenericCard());
  }
}

export const homeService = new HomeService();