export class DetailPelicula {
    adult?: boolean;
    backdrop_path?: string | null;
    genres?: Array<{ id: number; name: string }>;
    homepage?: string;
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string | null;
    production_companies?: Array<any>;
    production_countries?: Array<any>;
    release_date?: string;
    spoken_languages?: Array<any>;
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    runtime?: number;

    constructor(data: Partial<DetailPelicula> = {}) {
        Object.assign(this, data);
    }
}

export const detailPeliculaFromGeneric = (data: Partial<DetailPelicula>) => {
    return new DetailPelicula(data);
};