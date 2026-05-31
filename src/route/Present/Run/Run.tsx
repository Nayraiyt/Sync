import DisplaySong from "./Spodify/displaysong.tsx";
import Timer from "./Timer/timer.tsx";
import Map from "./Map/Map.tsx";


function Run(){
    return(
        <div className = "run">
            <div className = "background">
            </div>
            <div className = "foreground">
                <div className = "distance">
                    <p> 0km </p>
                </div>
                <div className = "map">
                    <Map/>
                </div>
                <div className = "time">
                    <Timer/>
                </div>
                <div className = "song">
                    <DisplaySong/>
                </div>
                <div className = "start"></div>
                <div className = "end"></div>
            </div>
        </div>
    )
}

export default Run;