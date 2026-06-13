import {
  GoogleMap,
  Polyline,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

type Props = {
  locations: {
    lat: number;
    lng: number;
  }[];
};

export const MiniMap = ({ locations }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: (import.meta as any).env?.VITE_GM_KEY,
  });

  const validLocations = locations.filter(
    (p) =>
        typeof p.lat === "number" &&
        typeof p.lng === "number"
    );

  if (!isLoaded || locations.length === 0) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      onLoad={(map) => {
        const bounds = new google.maps.LatLngBounds();

        locations.forEach((point) => {
          bounds.extend(point);
        });

        map.fitBounds(bounds);
      }}
      options={{
        disableDefaultUI: true,
        draggable: true,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        keyboardShortcuts: false,
        clickableIcons: false,
        gestureHandling: "none",
      }}
    >
      <Marker position={validLocations[0]} />

      <Polyline
        path={validLocations}
        options={{
          strokeColor: "#1b949d",
          strokeOpacity: 1,
          strokeWeight: 4,
        }}
      />
    </GoogleMap>
  );
};