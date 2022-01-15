import React, { useEffect, useState } from "react"
import Game from "../components/Game"
import PlayerList from "../components/PlayerList"
import PlayerForm from "../components/PlayerForm"

const GameContainer=() => {
    
    const [players, setPlayers] = useState([]);
    const playersURL = 'http://localhost:5000/api/players/';

    useEffect( () => {
        getPlayers().then((allPlayers)=>{
            setPlayers(allPlayers);
        });
      }, []);

    const getPlayers = () => {
        return fetch(playersURL)
            .then(res => res.json());
    };
      
    return(
        <>
            <h2>something</h2>
            <Game/>
            <PlayerList players={players}/>
            <PlayerForm/>
        </>
    );
};

export default GameContainer;