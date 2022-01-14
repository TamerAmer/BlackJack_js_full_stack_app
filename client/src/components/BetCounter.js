import React from "react";

const BetCounter = ({onBetSubmit}) => {

	// const dep = (amount) => {
	// 	onBetSubmit(total + amount);
	// };

	const clear = () => {
		onBetSubmit(0);
	};

	const handleCounterChange = (evt) => {
        console.log(evt.target.value)
		onBetSubmit(evt.target.value)
	}

	return (
		<>
			<div className="counter-container">
				<button value="5" id="button" className="five" onClick={handleCounterChange}><span className="FIVE">£5</span></button>
				<button value="10" id="button" className="ten" onClick={handleCounterChange}><span className="TEN">£10</span></button>
				<button value="20" id="button" className="twenty" onClick={handleCounterChange}><span className="TWENTY">£20</span></button>
				{/* <p className="stake" >Stake: {currentBetAmount}</p> */}
				<button id="button" className="clear" onClick={() => clear()}>Clear</button>
            </div>
		</>
	);
};

export default BetCounter;