import React,{useState,useEffect} from "react"
import Dealer from "./Dealer"
import Player from "./Player"

const Game=() => {

    const [currentPlayer,setCurrentPlayer]=useState(0)
    const [playerHand,setPlayerHand]=useState([])
    const [dealerHand,setDealerHand]=useState([])
    const [playerMoney,setPlayerMoney]=useState(100)
    const [playerBet,setPlayerBet]=useState(0)
    
    let deck=["1H","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
            "1C","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
            "1D","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
            "1S","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"]
            //does deck need to be a useState?? not rendered anywhere

            // is deck stored in database?
    
    function shuffleDeck(deck) {
        deck = deck.sort(() => Math.random() - 0.5)
        console.log(deck);
    }
    

    const shuffledDeck = shuffleDeck(deck);
    console.log(shuffledDeck);

    return(
        <>
        <h4>Game lol</h4>
        <Dealer />
        <Player />
        {shuffledDeck}
        </>
    )
}
export default Game