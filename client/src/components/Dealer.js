import React from "react";
import Card from "./Card";

const Dealer = ({dealerHand}) => {
    
    const showHand = dealerHand.map((card, index) => {
        return <Card card={card} key={index} />
    });

    return(
        <div className="dealer">
            <h2 className="hand-text">Dealer Hand</h2>
            {showHand}            
        </div>
    )
}

export default Dealer;