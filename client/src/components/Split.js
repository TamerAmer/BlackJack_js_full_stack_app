import React from "react"

const Split=({onSplit}) => {

    const handleSplit=() => {
        console.log("handle split")
        onSplit()
    }

    return(
        <>
            <button className="player-action-button" id="button" onClick={handleSplit}>Split</button>
        </>
    )
}
export default Split