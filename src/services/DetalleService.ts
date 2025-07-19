import axios from "axios";
import type { Detail } from "../models/detail";

class DetalleService {
    async getDetalle(id: string, type: string): Promise<Detail> {
        const apiKey = import.meta.env.VITE_API_KEY ;
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=es-ES`);
        console.log("API Response:", response.data);
        return response.data;
    }
}

export const detalleService = new DetalleService();
