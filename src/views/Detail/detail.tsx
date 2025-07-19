import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { detalleService } from "../../services/DetalleService";

export const Detail = () => {
    const params = useParams();
    const location = useLocation();
    const type = location.pathname.includes('/movie') ? 'movie' : 'tv';
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            // Only fetch if id is present
            if (params.id) {
                const detail = await detalleService.getDetalle(String(params.id), type);
                setDetail(detail);
            }
        }
        fetchDetail();
    }, [params.id, type]);

    if (!detail) {
        // Show loading or fallback if detail is not ready
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{detail.id}</h2>
            <h2>{detail.overview}</h2>
        </div>
    );
}