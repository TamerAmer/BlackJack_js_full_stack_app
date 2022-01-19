import React, { useEffect, useState } from "react"
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
import Split from "../components/Split"
import DoubleDown from "../components/DoubleDown"

const GameContainer=() => {
    
    const [players, setPlayers] = useState([]);
    const [playerHand,setPlayerHand]=useState([]);
    const [dealerHand,setDealerHand]=useState([]);
    const [deck, setDeck] = useState();
    const [turnStage, setTurnStage] = useState(0);
    const [turnEndMessage, setTurnEndMessage] = useState("");
    const [minBet, setMinBet] = useState(5);
    const [canSplit, setCanSplit]=useState(false)
    const [hasSplit, setHasSplit]=useState(false)
    const [splitHand, setSplitHand]=useState([])
    const [splitDoubleDown, setSplitDoubleDown]=useState(false)

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

        //set turn stage so we can keep track of what to render
        setTurnStage(1);

        //create a deck to play with
        initialiseDeck();
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
    const onHitSplit=() => {

        //pass player card
        console.log("On hit Split GameContainer")

        //create copy of hand and take from the deck
        let newPlayerHand = [...playerHand, deck.shift()];
        
        //set
        setPlayerHand(newPlayerHand);

        //calculate player score at this point        
        let playerHandValue = handValuator(newPlayerHand);  
        console.log("player hand value = " + playerHandValue)

        //check for bust
        if(playerHandValue >= 21)
        {
            //if player is bust, reset flags
            setHasSplit(false);
            const handHolder = newPlayerHand;
            setPlayerHand(splitHand);
            setSplitHand(handHolder);
        }
    }  
    const onHitMe = () => {

        //if player split handle this now
        if (hasSplit==true){
            onHitSplit();
        }else{
        
            //pass player cards
            console.log("On hit me GameContainer")
            //create copy of hand and take from the deck
            let newPlayerHand = [...playerHand, deck.shift()];
            
            //set
            setPlayerHand(newPlayerHand);

            //get player score        
            let playerHandValue = handValuator(newPlayerHand);  
            console.log("player hand value = " + playerHandValue)

            //debug 
            if(playerHandValue > 21)
            {         
                console.log("Player is bust!");
            }else{
                console.log("Player now has " + playerHandValue );
            }

            // check for bust
            if(playerHandValue >= 21)
            {
                //use autostand when we calculate player is bust the game
                //needs to move to the next step
                autoStand(playerHandValue, dealerHand);
            }
        }

    }

    const onSplitStand = () => {

        //swap active player and split hands
        setHasSplit(false);
        const handHolder=playerHand;
        setPlayerHand(splitHand);
        setSplitHand(handHolder);
    }
    
    const onStand = () => {
        //handle if player chose to split
        if(hasSplit == true){
            setHasSplit(false);
            onSplitStand();
        }else{
            console.log("onStand- from button press");

            //dealer turn.. we can use state, this wasn't autofired
            const dealerHandValue = dealerTurn(dealerHand);

            // resolution - we can use what's stored in state, 
            //there were no changes lately (player just pressed stand)
            const playerHandValue = handValuator(playerHand);
            turnResolution(playerHandValue, dealerHandValue);
        }
    }

    const onPlayAgain = () => {      

        //got to betting phase
        setTurnStage(1);

        //reset hands
        setSplitHand([]);
        setPlayerHand([]);
        setDealerHand([]);
    }

    const onDoubleDown = () => {
        //handle split deck 
        if(hasSplit === true){

            //reset flag to show we have handled the split deck
            setHasSplit(false);
            //flag to show this split has been double downed
            setSplitDoubleDown(true);
            //deal a card to the player
            let newPlayerHand = [...playerHand, deck.shift()];
            //set in state
            setPlayerHand(newPlayerHand);
            //print to console to check all is well
            console.log(newPlayerHand);

            //hold current in temporary
            const handHolder = newPlayerHand;
            //swap active hand with handHolder temporary variable
            setPlayerHand(splitHand);
            setSplitHand(handHolder);

            //abstract current stake for clarity 
            const currentStake = players.at(-1).stake;
            //create object to send to db
            const updatedPlayer = {
                'currentMoney': players.at(-1).currentMoney - currentStake,
            }

            //updatePlayer updates db, then() updates front end
            updatePlayer(updatedPlayer, players.at(-1)._id)
            .then((data) =>
            {
                //re apply id
                updatedPlayer._id = players.at(-1)._id;                
            });

            //now update front end object to match db
            players.at(-1).currentMoney = players.at(-1).currentMoney - currentStake;

        }else{
            console.log("On Double down (Game container)");

            //double player stake!
            const currentStake = players.at(-1).stake;
            //objec tto update db with
            const updatedPlayer = {
                'currentMoney': players.at(-1).currentMoney - currentStake,
                'stake': (currentStake * 2)            
            }
            //update player updates db
            updatePlayer(updatedPlayer, players.at(-1)._id)
            .then((data) =>
            {
                //re apply id
                updatedPlayer._id = players.at(-1)._id;
                
            });

            //update front end with stake and current money
            players.at(-1).stake = players.at(-1).stake * 2;
            players.at(-1).currentMoney = players.at(-1).currentMoney - currentStake;

            //pass player card
            console.log("On hit me GameContainer")
            //create copy of hand and take from the deck
            let newPlayerHand = [...playerHand, deck.shift()];
            
            //set in state
            setPlayerHand(newPlayerHand);

            //dealer turn 
            dealerTurn(dealerHand);
            
            //work out player score
            let playerHandValue = handValuator(newPlayerHand);  
            console.log("player hand value = " + playerHandValue)

            //and pass to auto stand
            autoStand(playerHandValue,dealerHand);
        }

    }

    const onSplit = (() => {

        console.log("On Split (Game container)");

        //set flags to keep track 
        setHasSplit(true);
        setCanSplit(false);

        //update money, splits require another bet
        const currentStake = players.at(-1).stake;

        //create object for db
        const updatedPlayer = {
            'currentMoney': players.at(-1).currentMoney - currentStake
        }

        //and update db
        updatePlayer(updatedPlayer, players.at(-1)._id)
        .then((data) =>
        {
            //re apply id
            updatedPlayer._id = players.at(-1)._id;
            
        });

        //and update front end too
        players.at(-1).currentMoney = players.at(-1).currentMoney - currentStake;

        //lists for hands
        const firstSplit=[]
        const secondSplit=[]

        //split player hand in to two arrays
        firstSplit.push(playerHand[0])
        secondSplit.push(playerHand[1])

        //and deal a card from the deck to each hand (the player now has two)
        let firstPlayerHand = [...firstSplit, deck.shift()];
        let secondPlayerHand = [...secondSplit,deck.shift()]

        //set new hands in state
        setPlayerHand(firstPlayerHand)
        setSplitHand(secondPlayerHand)

        //evaluate hands
        let firstHandValue = handValuator(firstPlayerHand);
        let secondHandValue = handValuator(secondPlayerHand);

        //debug
        console.log(`Player has a ${firstHandValue} and a ${secondHandValue}`);

        //check for blackjack
        if (firstHandValue == 21){
            //set the value to a string, we will check for this later
            firstHandValue = "BlackJack";
            //set flag to keep track what has been worked out
            setHasSplit(false);

            //debug
            console.log(firstHandValue);

            //copy hand to temporary variable
            const handHolder1 = firstPlayerHand
            const handHolder2 = secondPlayerHand

            //and swap hands
            setSplitHand(handHolder1);
            setPlayerHand(handHolder2);
            
            //check second hand for blackjack
            if(secondHandValue == 21){
                secondHandValue = "BlackJack";
                autoStand(secondHandValue, dealerHand);
            }
        }

        //check for blackjack on the second hand
        if (secondHandValue == 21){

            secondHandValue = "BlackJack";
            console.log(secondHandValue);
            setHasSplit(false);
        }
    });

    //////end of on button presses functions

    ///////game helper functions////
    function initialiseDeck()
    {
        let deck = ["AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
        "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
        "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
        "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"];

        const shuffledDeck = shuffleDeck(deck);
        setDeck(shuffledDeck);

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
        
        return shuffledDeck;
    }
    
    function dealCards(_deck) {

        console.log("dealing cards");
        //shift takes from array and saves in variable
        //Player
        if(_deck.length < 25){
            console.log("attempting to reset");
            //set a new deck to state
            _deck = initialiseDeck();
        }

        console.log(_deck);
        //create array to hold player cards
        let twoCards = ["AH","AD"];             
        //take cards from our passed deck and put them in the array
        // twoCards.push( _deck.shift() );
        // twoCards.push( _deck.shift() );

        //save to state
        setPlayerHand(twoCards);
        let playerHandValue = handValuator(twoCards);

        console.log("Player has " + playerHandValue);

        //debug
        if(playerHandValue === 21){
            console.log("PLAYER BLACKJACK!!!")
        }
        //check to see if we are to split (both cards are of equal value)
        const firstCard = handValuator([twoCards[0]]);
        const secondCard = handValuator([twoCards[1]]);
        if(firstCard == secondCard){
            setCanSplit(true)
        }
        
        //debug
        console.log(_deck);

        //Dealer
        //create array for dealer cards to live
        let _dealerHand = [];        
        //deal cards from passed deck
        _dealerHand.push( _deck.shift() );
        _dealerHand.push( _deck.shift() );

        //save to state
        setDealerHand(_dealerHand);

        //debug
        console.log(_deck);
        console.log(_dealerHand)
        console.log("Dealer's first is " + _dealerHand[0]);
        console.log("Dealer's second is " + _dealerHand[1]);

        //check for player blackjack
        if(playerHandValue === 21){
            //dave value as a string to be checked on turn resolution
            playerHandValue = "BlackJack";
            //using autostand with variables created in this scope
            //values set in state are unreliable at this point,
            //we have been firing these functions from other functions
            autoStand(playerHandValue, _dealerHand);
        }
    }

    const autoStand = (playerHandValue, _dealerHand) => {
        //autoStand takes parameters so we do not need to rely on the values
        //in state being up to date
        
        //use passed dealerHand to find value of hand
        const dealerHandValue = dealerTurn(_dealerHand)

        //and use passed playerHandValue to complete the parameters for turnResolution
        turnResolution(playerHandValue, dealerHandValue);
    }

    const dealerTurn = (_dealerHand) => {
        
        console.log("On dealer turn");

        //before we start make a copy of deck from state- we will be making too many changes quickly for
        //it to keep up
        let deckCopy = deck.map(c=>c)
        //calculate hand value with passed parameter, state con not be trusted here
        let dealerHandValue = handValuator(_dealerHand);
        let newDealerHand = _dealerHand;

        //debug
        console.log("Dealer hand..");
        console.log(_dealerHand);

        //check for dealer blackjack - blackjack can only happen if dealer has two cards!
        if (dealerHandValue == 21 && _dealerHand.length == 2){
            dealerHandValue = "BlackJack";
        }else{
            //keep dealing cards to the dealer until they have 17 or more
            while (dealerHandValue < 17 )
            {   
                //temp var of a card from the deck
                const card = deckCopy.splice(0,1);

                //debug
                console.log(card[0]) 

                //add card to this new hand
                newDealerHand.push(card[0])

                //debug
                console.log(newDealerHand);

                //update scoped variable
                dealerHandValue = handValuator(newDealerHand);

                //debug
                console.log("Dealer total = " + dealerHandValue);
            }
        }

        //if we get here, we broke out the while loop, set deck in state from our copy
        setDeck(deckCopy);
        //and also set the dealer's hand in state
        setDealerHand(newDealerHand);

        //if dealer is bust
        if(dealerHandValue > 21)
        {
            //denote is bust by minus value, we will check for this on turn resolution
            dealerHandValue = -1;
        }

        //debug
        console.log("Finished dealer while loop");

        return dealerHandValue;
    }

    const turnResolution = (playerHandValue, dealerHandValue) => {
        
        //work out who won!
        //save player hand values in array
        let isSplit = [playerHandValue];
        let splitHandValue;
        //if we have anything in our split hand
        // - if player chose not to split, this will be empty and skipped
        if (splitHand.length >= 1){
            //debug
            console.log(splitHand)
            console.log("in turn resolution splithand if statement")

            //work out split hand value
            splitHandValue = handValuator(splitHand);
            if (splitHandValue == 21 && splitHand.length == 2){
                //save value as string - we will check for this later
                splitHandValue = "BlackJack";
            }

            //add split hand value to the array
            isSplit.push(splitHandValue);

        }
        //run through all hand values
        for(let i = 0; i < isSplit.length; i++)
        {
            //re use player hand value variable
            playerHandValue=isSplit[i]
            //debug
            console.log("on turn resolution")
            
            if(playerHandValue > 21)
            {
                //set to -2 so player always loses against dealer
                playerHandValue = -2;
            }
            //this is where we check for the string saved earlier
            if (playerHandValue == "BlackJack"){
                playerHandValue = 22;
            }
            //check dealer for string too
            if (dealerHandValue == "BlackJack"){
                dealerHandValue = 22;
                //debug
                console.log("Dealer has BlackJack")
            }

            //debug
            console.log("IF statement player hand value = " + playerHandValue);
            console.log("IF statement dealer hand value = " + dealerHandValue);

            //Check who has the higher value to determine winner
            if( playerHandValue > dealerHandValue)
            {
                //player wins
                console.log("Player wins!");
                //user message
                setTurnEndMessage("Not bad - You won!");
                                
                //create scoped function to determine how much player should receive
                let moneyToAdd = players.at(-1).stake * 2;
                
                //check to see if player has split and the first hand is a double down
                if(isSplit[i] === splitHandValue && splitDoubleDown == true){
                    moneyToAdd = players.at(-1).stake * 4;
                    console.log("Quadrouple stake")
                }
                
                //check to see if player has blackjack
                if (playerHandValue == 22){
                    //player gets more money!
                    moneyToAdd = players.at(-1).stake * 2.5
                    console.log('player wins with Blackjack!!!!, stake changed');
                }

                //update player object on db
                const updatedPlayer = { 
                    'currentMoney': players.at(-1).currentMoney + moneyToAdd
                }                

                //db update
                updatePlayer(updatedPlayer, players.at(-1)._id)
                .then((data) =>
                {
                    updatedPlayer._id = players.at(-1)._id;
                    
                });

                //update front end
                players.at(-1).currentMoney = players.at(-1).currentMoney + moneyToAdd;

                //and force a re-render with a message update
                if (playerHandValue == 22){
                    setTurnEndMessage("Player Wins with Blackjack!")
                }
                else
                    setTurnEndMessage("Player Wins!")
        
            }
            else if (dealerHandValue > playerHandValue)
            {
                //dealer wins
                console.log("Dealer wins!")
                
                //set message to re-render
                setTurnEndMessage("Too bad - Dealer Wins!")
                
            }
            else
            {
                //debug
                console.log("Push - Player gets money back");

                //abstract for clarity
                let moneyToAdd = players.at(-1).stake;

                //create updated object
                const updatedPlayer = { 
                    'currentMoney': players.at(-1).currentMoney + moneyToAdd                
                }

                //update player in db                
                updatePlayer(updatedPlayer, players.at(-1)._id)
                .then((data) =>
                {
                    //re apply id
                    updatedPlayer._id = players.at(-1)._id;                    
                })

                //update front end
                players.at(-1).currentMoney = players.at(-1).currentMoney + moneyToAdd
                
                //a draw!
                setTurnEndMessage("Push! You get your £££ back!");
            }
        }

        //increase min bet!
        //use temp varialbe, don't rely on state being updated
        const _minBet = minBet + 5;
        setMinBet(_minBet);

        //check if palyer can play another game
        if(players.at(-1).currentMoney >= _minBet) 
        {
            //save to db
            const updatedPlayer = {                 
                'turnsSurvived': players.at(-1).turnsSurvived + 1
            }
            updatePlayer(updatedPlayer, players.at(-1)._id)
            .then((data) =>
            {
                updatedPlayer._id = players.at(-1)._id;                
            })
            
            //update front end turns
            players.at(-1).turnsSurvived = players.at(-1).turnsSurvived + 1;

            //debug
            console.log("Player survives")
            
            //we can play again with same player
            //set turn stage to show the correct buttons
            setTurnStage(3);
        }
        else
        {
            //debug
            console.log("Player dies");
            //player is dead
            setTurnStage(0);

            //reset flags
            setPlayerHand([])
            setDealerHand([])

            //reset min bet
            setMinBet(5);
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
        
        return(totalValue);
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
                <Dealer dealerHand={dealerHand} turnStage={turnStage}/> : null
            }
            {turnStage > 1 ?
                <Player handValuator={handValuator} playerHand={playerHand} splitHand={splitHand}/> : null
            }     
            {turnStage == 2 ?
                    <PlayerActions onHitMe={onHitMe} onStand={onStand}/> : null
            }
            {turnStage == 2 ?
                playerHand.length == 2 ?
                    players.at(-1).currentMoney > players.at(-1).stake ?
                        <DoubleDown onDoubleDown={onDoubleDown}/> : null : null : null
            }
            {turnStage == 2 ?
                canSplit == true ?
                    players.at(-1).currentMoney >= players.at(-1).stake?
                        <Split onSplit={onSplit}/> : null : null : null
            }
            {turnStage == 3 ?
                <PlayAgain turnEndMessage={turnEndMessage} onPlayAgain={onPlayAgain}/> : null
            }
        </>
    );
};

export default GameContainer;