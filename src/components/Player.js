import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { playSong } from "../util";

const Player = ({
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef, 
  songInfo, 
  setSongInfo, 
  timeUpdateHandler,
  songs,
  setCurrentSong,
  setSongs
}) => {
  // useEffect
  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
          return {
              ...song,
              active: true,
          }
      } else {
          return {
              ...song,
              active: false
          }
      }
  });
  setSongs(newSong);
  }, [currentSong])

  // Event handlers
  const playSongHandler = () => {
    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying)
    }
  };

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if(direction === "skip-back") {
      if((currentIndex-1) % songs.length === -1) {
        setCurrentSong(songs[songs.length -1]);
        // bug fix -skip-forward-play
        playSong(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    // bug fix -skip-forward-play
    playSong(isPlaying, audioRef);
  };

  const getTime = (time) => {
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...setSongInfo,
      currentTime: e.target.value,
    });   
  };

    return (
        <div className="player">
          <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input type="range" min="0" max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler}/>
            <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
          </div>
          <div className="player-control">
          <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" icon={faAngleLeft} size="2x" />
          <FontAwesomeIcon className="play" icon={isPlaying ? faPause : faPlay} size="2x" onClick={playSongHandler} />
          <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-forward" icon={faAngleRight} size="2x" />
          </div>
          <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} >
          </audio>
        </div>
    );
};

export default Player;