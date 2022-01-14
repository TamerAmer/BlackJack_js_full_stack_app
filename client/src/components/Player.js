import React from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";

const Player = ({onBetSubmit}) => {
    
    return(
        <>
        <h3>Player</h3>
        <PlayerActions />
        <BetCounter onBetSubmit={onBetSubmit}/>
        </>
    )
}

export default Player;