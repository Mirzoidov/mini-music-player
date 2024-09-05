import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ({
  currentSong, 
  isPlaying, 
  setIsPlaying, 
  audioRef, 
  songInfo, 
  setSongInfo, 
  timeUpdateHandler
}) => {

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
            <p>{getTime(songInfo.duration)}</p>
          </div>
          <div className="player-control">
          <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
          <FontAwesomeIcon className="play" icon={isPlaying ? faPause : faPlay} size="2x" onClick={playSongHandler} />
          <FontAwesomeIcon className="skip-forward" icon={faAngleRight} size="2x" />
          </div>
          <audio ref={audioRef} src={currentSong.audio} onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} >
          </audio>
        </div>
    );
};

export default Player;