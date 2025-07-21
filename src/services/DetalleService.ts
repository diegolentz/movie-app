import axios from "axios";
import type { DetailPelicula } from "../models/detailPelicula";
import type { DetailSerie } from "../models/detailSerie";

class DetalleService {
    async getDetalle(id: string, type: string): Promise<DetailPelicula | DetailSerie> {
        const apiKey = import.meta.env.VITE_API_KEY ;
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=es-ES`);
        console.log("API Response:", response.data);
        return response.data;
    }
}

export const detalleService = new DetalleService();
