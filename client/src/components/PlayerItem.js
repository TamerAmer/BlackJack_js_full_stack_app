import React from "react";

const PlayerItem = ({player}) => {
    
    return(
        <>
            <p>Name: {player.name} - Turns Survived: {player.turnsSurvived}</p>
        </>
    )
}

export default PlayerItem;
