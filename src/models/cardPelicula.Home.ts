import { CardGenericHome } from "./cardGenericHome";

export class CardPeliculaHome {
    id: number;
    original_title: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
    popularity: number; 
    overview: string;

    constructor(
        id: number,
        original_title: string,
        poster_path: string,
        vote_average: number,
        first_air_date: string,
        popularity: number,
        overview: string
    ) {
        this.id = id;
        this.original_title = original_title;
        this.poster_path = poster_path;
        this.vote_average = vote_average;
        this.first_air_date = first_air_date;
        this.popularity = popularity;
        this.overview = overview;
    }

    toGenericCard(): CardGenericHome {
        return new CardGenericHome(
            this.id,
            this.original_title,
            this.poster_path,
            this.vote_average,
            this.first_air_date,
            this.popularity,
            'movie',
            this.overview
        );
    }
}