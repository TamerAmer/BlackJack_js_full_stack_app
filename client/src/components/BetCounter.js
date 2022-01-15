import React from "react";
import { updatePlayer } from "../helpers/DBHelpers";

const BetCounter = ({ onPlaceBet, onBetSubmit,onBetClear, currentBetAmount}) => {

	// const dep = (amount) => {
	// 	onBetSubmit(total + amount);
	// };



	const handleClear = () => {
		onBetClear();
	};

	const handleCounterChange = (evt) => {
		console.log(evt.target.value)
		onBetSubmit(evt.target.value)
	}

	const handleSubmitBet = () => {
		onPlaceBet();
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