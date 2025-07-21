export class Actor {
    id: number;
    name: string;
    profile_path: string;

    constructor(id: number, name: string, profile_path: string) {
        this.id = id;
        this.name = name;
        this.profile_path = profile_path;
    }
}