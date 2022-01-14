import React, { useEffect } from "react"
import Game from "../components/Game"
import PlayerList from "../components/PlayerList"
import PlayerForm from "../components/PlayerForm"

const GameContainer=() => {

    useEffect( () => {
      }, []);
      
    return(
        <>
            <h2>something</h2>
            <Game/>
            <PlayerList/>
            <PlayerForm/>
        </>
    )
}
export default GameContainer