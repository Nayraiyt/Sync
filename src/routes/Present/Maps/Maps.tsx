import { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import "./Maps.css";

const DEFAULT_CENTER = { lat: 45.4215, lng: -75.6972 };

function Maps() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: (import.meta as any).env?.VITE_GM_KEY,
    });
    const [center, setCenter] = useState(DEFAULT_CENTER);
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setIsLocationLoading(false);
                },
                (error) => {
                    console.error("Error fetching geolocation, using fallback:", error);
                    setIsLocationLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setIsLocationLoading(false);
        }
    }, []);

    if (!isLoaded || isLocationLoading) {
        return <div className="Maps_Loading">Loading Map & Location...</div>;
    }

    return (
        <div className="Maps_Box">
            <GoogleMap 
                center={center} 
                zoom={15} 
                mapContainerStyle={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default Maps;