export class DetailSerie {
    adult?: boolean;
    backdrop_path?: string | null;
    created_by?: Array<any>;
    episode_run_time?: number[];
    first_air_date?: string;
    genres?: Array<{ id: number; name: string }>;
    homepage?: string;
    id?: number;
    in_production?: boolean;
    languages?: string[];
    last_air_date?: string;
    last_episode_to_air?: any;
    name?: string;
    networks?: Array<any>;
    next_episode_to_air?: any;
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string | null;
    production_companies?: Array<any>;
    production_countries?: Array<any>;
    seasons?: Array<any>;
    spoken_languages?: Array<any>;
    status?: string;
    tagline?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;

    constructor(data: Partial<DetailSerie>) {
        Object.assign(this, data);
    }
}

export const detailSerieFromGeneric = (data: Partial<DetailSerie>) => {
    return new DetailSerie(data);
};