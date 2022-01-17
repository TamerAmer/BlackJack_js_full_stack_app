import React, { useEffect, useState } from "react"
import Game from "../components/Game"
import PlayerList from "../components/PlayerList"
import PlayerForm from "../components/PlayerForm"
import Dealer from "../components/Dealer"
import Player from "../components/Player"
import { getPlayers } from "../helpers/DBHelpers";
import { updatePlayer } from "../helpers/DBHelpers"
import BetCounter from "../components/BetCounter"
import PlayerActions from "../components/PlayerActions"
import PlayAgain from "../components/PlayAgain"
import PlayerMoney from "../components/PlayerMoney"
import Stake from "../components/Stake"

const GameContainer=() => {
    
    const [players, setPlayers] = useState([]);
    //const [currentPlayer,setCurrentPlayer]=useState(null);
    const [playerHand,setPlayerHand]=useState([]);
    const [dealerHand,setDealerHand]=useState([]);
    const [deck, setDeck] = useState();
    const [turnStage, setTurnStage] = useState(0);
    const [turnEndMessage, setTurnEndMessage] = useState("");
    const [minBet, setMinBet] = useState(5);

    useEffect( () => {    
        console.log("use effect GameContainer");
        getPlayers().then((allPlayers)=>{
            setPlayers(allPlayers);
        });

      }, []);

    ///////on button presses functions
    const addPlayer = (player) => {
        //update the players list with object received from db
        //get all players and add our new player
        const newPlayers = [...players, player];
        //add player to list
        setPlayers(newPlayers);
        //remember this player has active/current player
        //setCurrentPlayer(player);

        initialiseDeck()
    }

    const addBet = (player) => {
        
        //make a copy of players list so we can make changes
        const newPlayers = [...players];
        //find player and change current money to the 
        //passed player object's current money
        const playerToChange = newPlayers.find( obj => obj._id === player._id)
        
        playerToChange.currentMoney = player.currentMoney;
        playerToChange.stake = player.stake;

        //re set the players
        setPlayers(newPlayers);

        //ready to start game now we have a player and a bet!
        turnFlow();

    }
    //player hit me   
    const onHitMe = () => {

        //pass player card
        console.log("On hit me GameContainer")
        //create copy of hand and take from the deck
        let newPlayerHand = [...playerHand, deck.shift()];
        //if(newPlayerHand )
        //set
        setPlayerHand(newPlayerHand);

        //at this point we need to check if player is bust
        
        let playerHandValue = handValuator(newPlayerHand);  
        console.log("player hand value = " + playerHandValue)

        //check for bust
        if(playerHandValue > 21)
        {
            //Check for player money.. if 0 then setCurrentPlayer to null
            console.log("Player is bust!");
        }else{
            console.log("Player now has " + playerHandValue );
        }

        if(playerHandValue >= 21)
        {
            //we can use state, this wasn't auto fired
            autoStand(playerHandValue, dealerHand);
        }
        //separate the if statements to fix the blackjack bug
        //blackjack only occurs if this autoStand will trigger, use this

    }
    //I think a change is needed to stop state change delays from causing miss fire bugs
    //If we instead pass a parameter in onStand() that takes in the playerHand and potentially the handValue we eliminate the need for state changes that can potentially mess up the program
    const onStand = () => {

        //this function is called if player presses Stand button
        //we don't update the cards
        //just call dealer turn

        console.log("onStand- from button press")       

         //dealer turn.. we can use state, this wasn't autofired
         const dealerHandValue = dealerTurn(dealerHand);

         // resolution - we can use what's stored in state, 
         //there were no changes lately (player just pressed stand)
         const playerHandValue = handValuator(playerHand);
         turnResolution(playerHandValue, dealerHandValue);
    }

    const onPlayAgain = () => {
        //got to betting phase
        setTurnStage(1);
    }

    const onDoubleDown = () => {
        console.log("On Double down (Game container)");

        //double player stake
        //////
        //update db
        const currentStake = players.at(-1).stake;
        const updatedPlayer = {
            'currentMoney': players.at(-1).currentMoney - currentStake,
            'stake': (currentStake * 2)            
        }
        //update player updates db, then() updates front end
        updatePlayer(updatedPlayer, players.at(-1)._id)
        .then((data) =>
        {
            updatedPlayer._id = players.at(-1)._id;
            
        });

        //update front end
        players.at(-1).stake = players.at(-1).stake * 2;
        players.at(-1).currentMoney = players.at(-1).currentMoney - currentStake;

        //pass player card
        console.log("On hit me GameContainer")
        //create copy of hand and take from the deck
        let newPlayerHand = [...playerHand, deck.shift()];
        //if(newPlayerHand )
        //set
        setPlayerHand(newPlayerHand);

        //dear turn 
        dealerTurn(dealerHand);

        let playerHandValue = handValuator(newPlayerHand);  
        console.log("player hand value = " + playerHandValue)

        autoStand(playerHandValue,dealerHand);

    }
    //////end of on button presses functions

    ///////game helper functions////

    function initialiseDeck()
    {
         //set turn stage so we can keep track of what to render
         setTurnStage(1);

        let deck=["AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
        "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
        "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
        "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"]

        const shuffledDeck = shuffleDeck(deck)
        setDeck(shuffledDeck)

        return shuffledDeck;
    }

    const turnFlow = () => {         

        //progress the turn stage
        setTurnStage(2);

        //Betting phase goes here!
        console.log("game flow")
        //shuffle
        //deal shuffle to dealer and players
        dealCards(deck);
    }

    const shuffleDeck=(deckToShuffle) =>{
        console.log("shuffling deck");
        //make copy of array
        let shuffledDeck = deckToShuffle.map(s =>s);        
        //random sort (this works)
        shuffledDeck.sort(() => Math.random() - 0.5)
        //
        return shuffledDeck;
    }
    
    function dealCards(_deck) {
        console.log("dealing cards");
        //shift takes from array and saves in variable
        //Player
        if(_deck.length<25){
            console.log("attempting to reset");
            //set a new deck to state
            _deck = initialiseDeck();
            console.log(_deck);
            
        }
        let twoCards = [];             
        twoCards.push( _deck.shift() );
        twoCards.push( _deck.shift() );
        setPlayerHand(twoCards);
        let playerHandValue = handValuator(twoCards)

        console.log("Player has " + playerHandValue);

        if(playerHandValue===21){
            console.log("PLAYER BLACKJACK!!!")
        }

        //Dealer
        let _dealerHand = [];        
        _dealerHand.push( _deck.shift() );
        _dealerHand.push( _deck.shift() );
        setDealerHand(_dealerHand);
        
        console.log("Dealer's first is " + _dealerHand[0]);
        console.log("Dealer's second is " + _dealerHand[1]);

        if(playerHandValue === 21){
            playerHandValue="BlackJack"
            autoStand(playerHandValue, _dealerHand)
        }

    }

    const autoStand = (playerHandValue, _dealerHand) => {
        //dealer turn..
        // resolution - we can't use what's in state because this call
        // was made too quickly for state to keep up
        // use passed dealerHand to find value of hand
        const dealerHandValue = handValuator(_dealerHand);
        //and use passed playerHandValue to complete the parameters for turnResolution
        turnResolution(playerHandValue, dealerHandValue);
    }

    const dealerTurn = (_dealerHand) => {
        //start dealer logic
        //go to Dealer.js?
        console.log("On dealer turn");

        //before we start make a copy of deck from state- we will be making too many changes quickly for
        //it to keep up
        let deckCopy = deck.map(c=>c)
        //don't use state!
        let dealerHandValue = handValuator(_dealerHand);
        let newDealerHand=_dealerHand;
        console.log("Dealer hand..");
        console.log(_dealerHand);
        while (dealerHandValue < 17 )
        {   
            const card=deckCopy.splice(0,1)   
            console.log(card[0]) 
            newDealerHand.push(card[0])    
            // newDealerHand.splice(0,0,card[0])
            console.log(newDealerHand);
            //set
            dealerHandValue = handValuator(newDealerHand);

            console.log("Dealer total = " + dealerHandValue);
        }

        //now we have finished, set deck in state from our copy
        setDeck(deckCopy);

        setDealerHand(newDealerHand);

        if(dealerHandValue > 21)
        {
            dealerHandValue = -1;
        }

        console.log("Finished dealer while loop");

        return dealerHandValue;
    }

    const turnResolution = (playerHandValue, dealerHandValue) => {

         

        console.log("on turn resolution")
        //set to -2 so player always loses against dealer
        //working this out again unless we want to save to state?
       
        if(playerHandValue > 21)
        {
            playerHandValue = -2;
        }
        if (playerHandValue=="BlackJack"){
            playerHandValue=22
        }
        
        console.log("IF statement player hand value = " + playerHandValue);
        console.log("IF statement dealer hand value = " + dealerHandValue);
        if (dealerHand.length==2 && dealerHandValue==21){
            dealerHandValue=22
        }

        //check for blackjack on either the player side or the dealer side
        //if either have a blackjack set the handValue to 22
        //if player wins with blackjack give player 2.5x bet amount
        let updatedPlayerTest = players.at(-1); 
        if( playerHandValue > dealerHandValue)
        {
            //player wins
            console.log("Player wins!");

            setTurnEndMessage("Not bad - You won!");
            
            //////
             //update db
            let moneyToAdd = players.at(-1).stake * 2
            
            if (playerHandValue == 22){
                moneyToAdd = players.at(-1).stake * 2.5
                console.log('player wins with Blackjack!!!!, stake changed');
            }

            const updatedPlayer = { 
                'turnsSurvived': players.at(-1).turnsSurvived + 1,
                'currentMoney': players.at(-1).currentMoney + moneyToAdd
            }
            //update player updates db, then() updates front end
            console.log(moneyToAdd);
            updatePlayer(updatedPlayer, players.at(-1)._id)
            .then((data) =>
            {
                updatedPlayer._id = players.at(-1)._id;
                
            })

            //update front end
            players.at(-1).currentMoney = players.at(-1).currentMoney + moneyToAdd

            //and force a re-render
            setTurnEndMessage("Player Wins with Blackjack!")
    
        }
        else if (dealerHandValue > playerHandValue)
        {
            //dealer wins
            console.log("Dealer wins!")

            setTurnEndMessage("Too bad - Dealer Wins!")
            
        }
        else
        {
            //a "push" happens, player gets money back
            console.log("Push - Player gets money back")

            let moneyToAdd = players.at(-1).stake

            const updatedPlayer = { 
                'currentMoney': players.at(-1).currentMoney + moneyToAdd,
                'turnsSurvived': players.at(-1).turnsSurvived + 1
            }
            //update player updates db, then() updates front end
            console.log(moneyToAdd);
            updatePlayer(updatedPlayer, players.at(-1)._id)
            .then((data) =>
            {
                updatedPlayer._id = players.at(-1)._id;
                
            })

            //update front end
            players.at(-1).currentMoney = players.at(-1).currentMoney + moneyToAdd

            setTurnEndMessage("Push! What the fuck happens!?")
            //Give player 1x bet amount back in their money property
        }

        //set turn stage so we can keep track of what to render
        //check if player is still alive
        if(players.at(-1).currentMoney >= minBet) 
        {
            console.log("Player survives")
            //increase min bet
            setMinBet(minBet + 5);
            //we can play again with same player
            setTurnStage(3);
        }
        else
        {
            console.log("Player dies")
            //player is dead
            setTurnStage(0);
        }
    }

    const handValuator = (arrayOfCards) => {

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
        
        return(totalValue)
    }
    //////end of game helper functions

    return(
        <>
            {turnStage > 0 ?
                <PlayerMoney player={players.at(-1)}/> : null
            }
            {turnStage == 2 ?
                <Stake stake={players.at(-1).stake}/> : null
            }
            {turnStage == 0 ? 
                <PlayerList players={players}/> : null
            }               
            {turnStage == 0 ?
                <PlayerForm addPlayer={addPlayer}/> : null
            }
            {turnStage == 1 ?
                <BetCounter addBet={addBet} player={players.at(-1)} minBet={minBet}/> : null            
            }           
            {turnStage > 1?
                <Dealer dealerHand={dealerHand}/> : null
            }
            {turnStage > 1 ?
                <Player player={players.at(-1)} playerHand={playerHand}/> : null
            }           
            {turnStage == 2 ?
                <PlayerActions onHitMe={onHitMe} onStand={onStand} onDoubleDown={onDoubleDown}/> : null
            }
            {turnStage == 3 ?
                <PlayAgain turnEndMessage={turnEndMessage} onPlayAgain={onPlayAgain}/> : null
            }
        </>
    );
};

export default GameContainer;