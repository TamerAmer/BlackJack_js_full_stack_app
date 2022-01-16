import React, { useState } from "react";
import { postPlayer, updatePlayer } from "../helpers/DBHelpers";

const BetCounter = ({ addBet, player}) => {

	// const dep = (amount) => {
	// 	onBetSubmit(total + amount);
	// };

    const [currentBetAmount, setCurrentBetAmount] = useState(0);

	const handleClear = () => {
		setCurrentBetAmount(0);
	};

	const handleCounterChange = (evt) => {
        const intIncrement =  parseInt(evt.target.value)
        const intCurrentBet = parseInt(currentBetAmount);
        setCurrentBetAmount(intCurrentBet + intIncrement);
	}

	const handleSubmitBet = (evt) => {

         //stop post request to current url
        evt.preventDefault();
       
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
        })
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