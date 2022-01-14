import React from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";

const Player = ({onBetSubmit,onBetClear,currentBetAmount}) => {
    
    return(
        <>
        <h3>Player</h3>
        <PlayerActions />
        <BetCounter onBetSubmit={onBetSubmit} onBetClear={onBetClear} currentBetAmount={currentBetAmount}/>
        </>
    )
}

export default Player;