import React, { useEffect } from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";
import Card from "./Card";

const Player = ({onHitMe, onStand, player, addBet, playerHand}) => {
   
    const showHand = playerHand.map((card, index) => {
        return <Card card={card} key={index} />
    });

    return(
        <>
            <h3>Player Mon£y = {player.currentMoney}</h3>            
            <PlayerActions onHitMe={onHitMe} onStand={onStand}/>
            <BetCounter addBet={addBet} player={player}/>
            {showHand}            


        </>
    )
}

export default Player;