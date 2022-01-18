const PlayerMoney = ({player}) => {
    return(
        <div className="money-wrapper">
            <h3 className="player-money">Player Mon<span>£</span>y = {player.currentMoney}</h3>
        </div>
    )
}

export default PlayerMoney;