import React, { useState } from "react";
import {updatePlayer } from "../helpers/DBHelpers";
import Stake from "./Stake";
import '../css/BetCounter.css'

const BetCounter = ({ addBet, player, minBet}) => {

    const [currentBetAmount, setCurrentBetAmount] = useState(minBet);

	const handleClear = () => {
		setCurrentBetAmount(minBet);
	};

	const handleCounterChange = (evt) => {
        const intIncrement =  parseInt(evt.target.value);
        const intCurrentBet = parseInt(currentBetAmount);
        setCurrentBetAmount(intCurrentBet + intIncrement);
	};

	const handleSubmitBet = (evt) => {

         //stop post request to current url
        evt.preventDefault(); //necessary? - test

		//check if player has enough money to increment bet
		if(player.currentMoney >= currentBetAmount){
			console.log("player has enough money for bet");
		}
		else
		{
			console.log("player does NOT have enough money for bet - restting stake");
		 	setCurrentBetAmount(minBet);
			return;
		}
    
        //update db
        const updatedPlayer = {
			"stake":currentBetAmount,
            "currentMoney": (player.currentMoney - currentBetAmount)
        }
        //update player updates db, then() updates front end
        updatePlayer(updatedPlayer, player._id)
        .then((data) =>
        {
            updatedPlayer._id = player._id;
            addBet(updatedPlayer);
        });
	};

	return (
			<div className="counter-container">
				
				<Stake stake={currentBetAmount} />

				<button value="5" id="button" className="five" onClick={handleCounterChange}>£5</button>
				<button value="10" id="button" className="ten" onClick={handleCounterChange}>£10</button>
				<button value="20" id="button" className="twenty" onClick={handleCounterChange}>£20</button>
				<button id="button" className="place-bet" onClick={handleSubmitBet} >Place Bet</button>				
				<button id="button" className="clear" onClick={handleClear}>Clear</button>
            </div>
	);
};

export default BetCounter;