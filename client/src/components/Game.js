import React,{useState,useEffect} from "react"
import Dealer from "./Dealer"
import Player from "./Player"

const Game=() => {
    

    const [currentPlayer,setCurrentPlayer]=useState(0)
    const [playerHand,setPlayerHand]=useState([])
    const [dealerHand,setDealerHand]=useState([])
    const [playerMoney,setPlayerMoney]=useState(100)
    const [playerBet,setPlayerBet]=useState(0)
    const [deck, setDeck] = useState( initialiseDeck() )

    //refreshes render when state changes
    useEffect(()=>{
        //only on first load...
        let shuffledDeck =shuffleDeck();
        dealCards(shuffledDeck);
        
      },[]);
            
    function initialiseDeck()
    {
        let deck=["AH","2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH",
        "AC","2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC",
        "AD","2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD",
        "AS","2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS"]

        return deck
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
    }
    const onBetClear=() => {
        setPlayerBet(0)
        
    }

    const handValuator=(arrayOfCards) => {
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

        while(totalValue>21){
            const hasAce=cardValues.map((value) => {
                let exists=false
                if(value==11){
                    exists=true
                }
                return exists
                
            })
            if (hasAce){
                let loopCounter
                for(loopCounter=0; loopCounter < cardValues.length; loopCounter++){
                    if(cardValues[loopCounter]==11){
                        cardValues[loopCounter]=1
                        totalValue=0
                        cardValues.map((value) => {   
                            totalValue=totalValue+value
                        })
                        break
                    }
                }
            }else{ break}
            

        }
        console.log(totalValue)
    }

    // const testArray=["AS","AD","AH","AC"]
    return(
        <>
        <h4>Game lol</h4>
        <Dealer dealerHand={dealerHand}/>
        <Player onBetSubmit={onBetSubmit} onBetClear={onBetClear} currentBetAmount={playerBet}/>
        {handValuator(dealerHand)}
        </>
    )
}
export default Game