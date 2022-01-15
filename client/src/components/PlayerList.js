import PlayerItem from "./PlayerItem"

const PlayerList=({players}) => {

    const playersList = players.map((player) =>{
        return <PlayerItem player={player} key={player._id} />
    });
    return(
        <>
        <h4>Player List</h4>
        {playersList}
        </>
    )
}
export default PlayerList