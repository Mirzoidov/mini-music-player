import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { faNapster } from "@fortawesome/free-brands-svg-icons";

const Nav = ({libraryStatus, setLibraryStatus}) => {
    return (
        <nav>
            <h1>
                <FontAwesomeIcon className="icon-logo" icon={faNapster} /> 
                Mini music player
            </h1>
            <button onClick={()=> setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon className="icon-music" icon={faMusic} />
            </button>
        </nav>
    )
}

export default Nav;