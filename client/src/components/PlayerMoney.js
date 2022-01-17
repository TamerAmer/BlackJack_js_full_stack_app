const PlayerMoney = ({player}) => {
    return(
        <>
            <h3 className="player-money">Player Mon<span>£</span>y = {player.currentMoney}</h3>
        </>
    )
}

export default PlayerMoney;