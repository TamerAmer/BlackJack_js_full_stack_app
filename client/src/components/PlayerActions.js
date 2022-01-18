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
    
    return(
        <>
            <button className="player-action-button" id="button" onClick={handleHitMe}>Hit Me</button>
            <button className="player-action-button" id="button" onClick={handleStand}>Stand</button>
        </>
    )
}

export default PlayerActions;