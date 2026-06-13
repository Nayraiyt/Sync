import { useState, useEffect } from "react";
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Polyline,
} from "@react-google-maps/api";

import "./Maps.css";

const DEFAULT_CENTER = {
    lat: 45.4215,
    lng: -75.6972,
};

type Props = {
    locations: {
        lat: number;
        lng: number;
    }[];
};

function Maps({ locations }: Props) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: (import.meta as any).env?.VITE_GM_KEY,
    });

    const [center, setCenter] = useState(DEFAULT_CENTER);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [isLocationLoading, setIsLocationLoading] =
        useState(true);

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
        return (
            <div className="Maps_Loading">
                Loading Map & Location...
            </div>
        );
    }

    return (
        <div className="Maps_Box">
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}

                options={{
                    disableDefaultUI: true
                }}
            >
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 8,
                            fillColor: "#08627b",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "white",
                        }}
                    />
                )}

                {locations.length > 1 && (
                    <Polyline
                        path={locations}
                        options={{
                            strokeColor: "#9d1b81",
                            strokeOpacity: 1,
                            strokeWeight: 5,
                        }}
                    />
                )}
            </GoogleMap>
        </div>
    );
}

export default Maps;