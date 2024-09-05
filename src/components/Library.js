import React from "react";
import LibrarySong from "./LibrarySong";
import { library } from "@fortawesome/fontawesome-svg-core";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {

    return(
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong 
                        song={song} 
                        setCurrentSong={setCurrentSong} 
                        key={song.id} 
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        songs={songs} 
                        setSongs={setSongs}
                        id={song.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library;