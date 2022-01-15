import React, { useEffect, useState } from "react"
import Game from "../components/Game"
import PlayerList from "../components/PlayerList"
import PlayerForm from "../components/PlayerForm"
import { getPlayers } from "../helpers/DBHelpers";

const GameContainer=() => {
    
    const [players, setPlayers] = useState([]);

    useEffect( () => {        
        getPlayers().then((allPlayers)=>{
            setPlayers(allPlayers);
        });
      }, []);

    const addPlayer = (player) => {
        //update the players list with object received from db
        //get all players and add our new player
        const newPlayers = [...players, player];
        setPlayers(newPlayers);
    }
      
    return(
        <>
            <h2>something</h2>
            <Game/>
            <PlayerList players={players}/>
            <PlayerForm addPlayer={addPlayer}/>
        </>
    );
};

export default GameContainer;