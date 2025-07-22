export class Actor {
    id: number;
    name: string;
    profile_path: string;
    popularity: number;

    constructor(id: number, name: string, profile_path: string, popularity: number) {
        this.id = id;
        this.name = name;
        this.profile_path = profile_path;
        this.popularity = popularity;

    }
}