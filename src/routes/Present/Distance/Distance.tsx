import { useState, useEffect, useRef } from "react";

type Position = {
    lat: number;
    lng: number;
};

function calculateDistance(pointA: Position, pointB: Position) {
    const R = 6371000;

    const lat1 = (pointA.lat * Math.PI) / 180;
    const lat2 = (pointB.lat * Math.PI) / 180;

    const dLat = ((pointB.lat - pointA.lat) * Math.PI) / 180;
    const dLng = ((pointB.lng - pointA.lng) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export function Distance(isRunning: boolean) {
    const [distanceMeters, setDistanceMeters] = useState(0);
    const [locations, setLocations] = useState<Position[]>([]);

    const watchId = useRef<number | null>(null);
    const previousPosition = useRef<Position | null>(null);

    useEffect(() => {
        if (!isRunning) {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
                watchId.current = null;
            }
            return;
        }

        watchId.current = navigator.geolocation.watchPosition(
            (position) => {
                // Ignore low-quality GPS fixes
                if (position.coords.accuracy > 20) {
                    return;
                }

                const currentPosition: Position = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                setLocations((prev) => [...prev, currentPosition]);

                if (previousPosition.current) {
                    const segmentDistance = calculateDistance(
                        previousPosition.current,
                        currentPosition
                    );

                    // Ignore GPS jitter
                    if (segmentDistance > 3) {
                        setDistanceMeters(
                            (prev) => prev + segmentDistance
                        );
                    }
                }

                previousPosition.current = currentPosition;
            },
            (error) => {
                console.error("GPS Error:", error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000,
            }
        );

        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, [isRunning]);

    return {
        distanceMeters,
        distanceKm: distanceMeters / 1000,
        locations,
    };
}