import React from "react";

const PlayerActions = ({onHitMe, onStand}) => {

    const handleHitMe = () => {
        console.log("handle hit me")
        onHitMe();
    }

    const handleStand = () =>
    {
        console.log("handle stand")
        onStand();
    }
    const handleDoubleDown=() => {
        console.log("handle double down")
        onHitMe()
        onStand()
    }
    
    return(
        <>
            <button onClick={handleHitMe}>Hit Me</button>
            <button onClick={handleDoubleDown}>Double Down</button>
            <button onClick={handleStand}>Stand</button>
        </>
    )
}

export default PlayerActions;