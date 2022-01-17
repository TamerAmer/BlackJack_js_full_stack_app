import PlayerItem from "./PlayerItem"

const PlayerList=({players}) => {

    const sortList = () => {
        //sort list by turnSurvived
        players.sort((a, b) => parseInt(a.turnsSurvived) - parseInt(b.turnsSurvived));
    }

    const playersList = players.map((player) =>{
        //only return top 5

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