import { useJsApiLoader, GoogleMap, Marker} from "@react-google-maps/api";
import "./Maps.css";


function Maps() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: (import.meta as any).env?.VITE_GM_KEY,
    });

    if(!isLoaded){
        return <div>Loading...</div>
    }

    const ottawaCenter = { lat: 45.4247, lng: -75.6950 }; 
    return(
        <div className= "Maps_Box">
            <GoogleMap center= {ottawaCenter} zoom={15} mapContainerStyle={{width: '100%', height: '100%'}}/>
        </div>
    )
}

export default Maps;