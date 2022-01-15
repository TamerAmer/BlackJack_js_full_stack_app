import React, { useState } from "react";
import { updatePlayer } from "../helpers/DBHelpers";

const BetCounter = ({ onPlaceBet, onBetSubmit,onBetClear,  player}) => {

	// const dep = (amount) => {
	// 	onBetSubmit(total + amount);
	// };

    const [currentBetAmount, setCurrentBetAmount] = useState(0);

	const handleClear = () => {
		onBetClear();
	};

	const handleCounterChange = (evt) => {
		console.log(evt.target.value)
		//onBetSubmit(evt.target.value)

        setCurrentBetAmount(currentBetAmount + evt.target.value);
	}

	const handleSubmitBet = (evt) => {

         //stop post request to current url
        evt.preventDefault();
        console.log(player);
        //update player object         
        //player.currentMoney -= currentBetAmount

        //update db
        updatePlayer(player)
        

		// TODO
		// updatePlayerMoney()
	};

	return (
			<div className="counter-container">
				<button value="5" id="button" className="five" onClick={handleCounterChange}>£5</button>
				<button value="10" id="button" className="ten" onClick={handleCounterChange}>£10</button>
				<button value="20" id="button" className="twenty" onClick={handleCounterChange}>£20</button>
				<button id="button" className="place-bet" onClick={handleSubmitBet} >Place Bet</button>
				<p className="stake" >Stake: {currentBetAmount}</p>
				<button id="button" className="clear" onClick={handleClear}>Clear</button>
            </div>
	);
};

export default BetCounter;