import React from "react";

const DoubleDown=({onDoubleDown}) => { 
    
    const handleDoubleDown=() => {
        console.log("handle double down")
        onDoubleDown();
    }
    return(
            <button className="player-action-button" id="button" onClick={handleDoubleDown}>Double Down</button>
        )
}

export default DoubleDown