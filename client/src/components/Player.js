import React, { useEffect } from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";
import Card from "./Card";

const Player = ({player, playerHand}) => {
   
    const showHand = playerHand.map((card, index) => {
        return <Card card={card} key={index} />
    });

    return(
        <>
            <h2>Player Hand</h2>
            {showHand}            
            <br/>


        </>
    )
}

export default Player;