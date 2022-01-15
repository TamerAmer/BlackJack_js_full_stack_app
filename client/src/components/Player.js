import React from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";

const Player = ({ onPlaceBet, onBetSubmit,onBetClear,currentBetAmount, onHitMe, onStand, player}) => {
    
    return(
        <>
            <h3>Player</h3>
            <PlayerActions onHitMe={onHitMe} onStand={onStand}/>
            <BetCounter onPlaceBet={onPlaceBet} onBetSubmit={onBetSubmit} onBetClear={onBetClear} player={player}/>
        </>
    )
}

export default Player;