import React, { useEffect, useState } from "react"
import Game from "../components/Game"
import PlayerList from "../components/PlayerList"
import PlayerForm from "../components/PlayerForm"
import Dealer from "../components/Dealer"
import Player from "../components/Player"
import { getPlayers } from "../helpers/DBHelpers";

const GameContainer=() => {
    
    const [players, setPlayers] = useState([]);
    const [currentPlayer,setCurrentPlayer]=useState(0)
    const [playerHand,setPlayerHand]=useState([])
    const [dealerHand,setDealerHand]=useState([])
    const [playerMoney,setPlayerMoney]=useState(100)
    const [playerBet,setPlayerBet]=useState(0)
    const [deck, setDeck] = useState( initialiseDeck() )

    useEffect( () => {    
        console.log("use effect GameContainer");
        getPlayers().then((allPlayers)=>{
            setPlayers(allPlayers);
        });

      }, []);

    function initialiseDeck()
    {
        let deck=["AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
        "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
        "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
        "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"]

        return deck
    }

    const addPlayer = (player) => {
        //update the players list with object received from db
        //get all players and add our new player
        const newPlayers = [...players, player];
        setPlayers(newPlayers)
        console.log("then fired");

        //once we have added player to front end list, we can start a game with this player
        gameFlow();

    }

    const gameFlow = () => { 
        //shuffle
        let shuffledDeck = shuffleDeck();
        //deal shuffle to dealer and players
        dealCards(shuffledDeck);
    }

    const shuffleDeck=() =>{
        //make copy of array
        let shuffledDeck = deck.map(s =>s);        
        //random sort (this works)
        shuffledDeck.sort(() => Math.random() - 0.5)
        //
        setDeck(shuffledDeck);
        return shuffledDeck;
    }
    
    function dealCards(deck) {
        //shift takes from array and saves in variable
        //Player
        let twoCards = [];             
        twoCards.push( deck.shift() );
        twoCards.push( deck.shift() );
        setPlayerHand(twoCards);

        //Dealer
        twoCards = [];        
        twoCards.push( deck.shift() );
        twoCards.push( deck.shift() );
        setDealerHand(twoCards);
    }

    const onBetSubmit = (betAmount) => {
        let totalAmount=playerBet
        totalAmount=totalAmount + Number(betAmount)
        setPlayerBet(totalAmount)
        setPlayerMoney(playerMoney - betAmount)
    }
    const onBetClear=() => {
        setPlayerBet(0)
        
    }

    const handValuator=(arrayOfCards) => {

        let aces = []
        const cardValues=arrayOfCards.map((card) => {
            let firstChar = card.charAt(0)
            if (Number.isInteger(Number(firstChar))){
                firstChar=Number(firstChar)
                if(firstChar==1){
                    return(firstChar *10)
                }else{
                return(firstChar)
                }
            }else{
                if(firstChar=="A"){
                    //remember this ace
                    aces.push(card);
                    return(11)
                }
               else{
                    return(10)
                }
            }
        })
        let totalValue=0
        
        cardValues.map((value) => {
            totalValue=totalValue+value
        })

        for(let i = 0; i < aces.length; i++)
        {
            if (totalValue > 21)
            {
                console.log("reducing value");
                totalValue -= 10;
                console.log(totalValue);
            }
        }
        
        
        console.log(totalValue)
        return(totalValue)
    }
      
    return(
        <>
            <h2>something</h2>
            
            <PlayerList players={players}/>
            <PlayerForm addPlayer={addPlayer}/>
            <Dealer dealerHand={dealerHand}/>
            <Player onBetSubmit={onBetSubmit} onBetClear={onBetClear} currentBetAmount={playerBet}/>
        </>
    );
};

export default GameContainer;