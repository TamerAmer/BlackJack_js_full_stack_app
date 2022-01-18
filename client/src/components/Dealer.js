import React from "react";
import Card from "./Card";
import CardFaceDown from "./CardFaceDown";

const Dealer = ({dealerHand, turnStage}) => {
    
    const showHand = dealerHand.map((card, index) => {
        return <Card card={card} key={index} />
    });

    const showOne = dealerHand.splice(0,1).map((card, index) => {
        return <Card card={card} key={index} />
    });

    return(
        <>
            <h2>Dealer Hand</h2>
            {/* {turnStage == 2? <Card card = {dealerHand[0]} />: null} */}
            {turnStage == 2? showOne: null}
            {turnStage == 2? <CardFaceDown/>: null}
            {turnStage == 3? showHand: null}
            
        </>
    )
}

export default Dealer;