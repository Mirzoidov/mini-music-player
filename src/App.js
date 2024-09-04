import React, { useState } from "react";
//adding components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
// adding styles
import "./styles/app.scss";
// adding data
import data from "./util";


function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library songs={songs} />
    </div>
    
  );
}

export default App;
