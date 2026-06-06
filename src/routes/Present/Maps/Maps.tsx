import { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import "./Maps.css";

const DEFAULT_CENTER = { lat: 45.4215, lng: -75.6972 };

function Maps() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: (import.meta as any).env?.VITE_GM_KEY,
    });

    const [center, setCenter] = useState(DEFAULT_CENTER);
    const [userLocation, setUserLocation] = useState(null);
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCenter(pos);
                    setUserLocation(pos);
                    setIsLocationLoading(false);
                },
                () => setIsLocationLoading(false)
            );
        } else {
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
                mapContainerStyle={{ width: "100%", height: "100%" }}
            >
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "#4285F4",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "white",
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
}

export default Maps;
