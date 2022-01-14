import React from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";

const Player = ({onBetSubmit,onBetClear}) => {
    
    return(
        <>
        <h3>Player</h3>
        <PlayerActions />
        <BetCounter onBetSubmit={onBetSubmit} onBetClear={onBetClear}/>
        </>
    )
}

export default Player;