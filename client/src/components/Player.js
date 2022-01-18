import React, { useEffect } from "react";
import PlayerActions from "./PlayerActions";
import BetCounter from "./BetCounter";
import Card from "./Card";

const Player = ({playerHand, splitHand}) => {
   
    const showHand = playerHand.map((card, index) => {

        return <Card card={card} className={"card"} key={index} />
    });

    const showSplitHand = splitHand.map((card, index) => {
        return <Card card={card} className={"cardSmall"} key={index} />

    });

    return(
        <div className="player">
            <h2 className="hand-text">Player Hand</h2>
            {showHand}             

            {splitHand.length > 0 ?  <h3 className="hand-text">Split Hand</h3> : null}
            {showSplitHand}            
            <br/>


        </div>
    )
}

export default Player;