export class CardGenericHome {
    id: number;
    title: string;
    img: string;
    average: number;
    estreno: string;
    popularity: number;
    type: string;
    overview: string;

    constructor(
        id: number,
        title: string,
        img: string,
        average: number,
        estreno: string,
        popularity: number,
        type: string,
        overview: string
    ) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.average = average;
        this.estreno = estreno;
        this.popularity = popularity;
        this.type = type;
        this.overview = overview;
    }
    
}