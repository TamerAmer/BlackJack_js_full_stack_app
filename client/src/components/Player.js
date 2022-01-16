import React, { useEffect } from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";

const Player = ({onHitMe, onStand, player, addBet}) => {
   
    return(
        <>
            <h3>Player Mon£y = {player.currentMoney}</h3>
            <PlayerActions onHitMe={onHitMe} onStand={onStand}/>
            <BetCounter addBet={addBet} player={player}/>
        </>
    )
}

export default Player;