import React from "react";
import Card from "./Card";

const Dealer = ({dealerHand}) => {
    
    const showHand = dealerHand.map((card, index) => {
        return <Card card={card}  key={index} />
    });

    return(
        <>
            <h2>Dealer Hand</h2>
            {showHand}            
        </>
    )
}

export default Dealer;