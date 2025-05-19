// src/components/StarRating.tsx
import { useEffect, useState } from "react";
import { RateService } from "../services/rateServices";

function StarIcon({ size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
        </svg>
    );
}

// Icono de estrella rellena
function StarFilledIcon({ size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <polygon points="12 17.27 18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27" />
        </svg>
    );
}

interface StarRatingProps {
    idTrain: number;
    /* value: number;
      onRate?: (rating: number) => void; // Callback al seleccionar una calificación
      interactive?: boolean; */
}

export function StarRating({ idTrain }: StarRatingProps) {
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [totalRatings, setTotalRatings] = useState<number>(0);
    const [myRate, setMyRate] = useState<number>(0);

    useEffect(() => {
        //if(!id) return
        RateService.getGlobalRate(idTrain).then((data) => {
            console.log("rate", data);
            setAverageRating(data.averageRating);
            setTotalRatings(data.totalRatings);
        });

        RateService.getMyRate(idTrain).then((rate) => setMyRate(rate.value));
    }, [idTrain, myRate]);

    const handleRate = async (rating: number) => {
        await RateService.rate(idTrain, rating);
        setMyRate(rating);
    }

    return (
        <div className="flex space-x-1 my-5">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className="cursor-pointer"
                    onClick={() => handleRate(star)}
                >
                    {star <= myRate ? <StarFilledIcon size={20} className="text-yellow-500" /> : <StarIcon size={20} className="text-gray-400" />}
                </span>
            ))}
            <strong>Promedio:</strong> {averageRating ?? "N/A"} ⭐ ({totalRatings} votos)
        </div>
    );
}