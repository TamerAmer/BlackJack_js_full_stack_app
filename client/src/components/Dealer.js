import React from "react";

const Dealer = ({dealerHand,hitTheDealer,handValuator}) => {
    
    const dealerAction=() => {
        if(handValuator(dealerHand)<17){
            hitTheDealer()
        }
    }
    

    return(
        <>
        <h4>Dealer</h4>
        {dealerAction()}
        </>
    )
}

export default Dealer;