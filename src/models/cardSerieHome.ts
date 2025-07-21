import { CardGenericHome } from "./cardGenericHome";

export class CardSerieHome {
    id: number;
    original_name: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
    popularity: number;

    constructor(
        id: number,
        original_name: string,
        poster_path: string,
        vote_average: number,
        first_air_date: string,
        popularity: number
    ) {
        this.id = id;
        this.original_name = original_name;
        this.poster_path = poster_path;
        this.vote_average = vote_average;
        this.first_air_date = first_air_date;
        this.popularity = popularity;
    }

    toGenericCard(): CardGenericHome {
        return new CardGenericHome(
            this.id,
            this.original_name,
            this.poster_path,
            this.vote_average,
            this.first_air_date,
            this.popularity,
            'tv'
        );
    }
}