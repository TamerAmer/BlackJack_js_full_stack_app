import PlayerItem from "./PlayerItem"

const PlayerList=({players}) => {

    //make deep copy, we don't want to alter list in state
    let playersCopy = [...players];

    //sort whole list
    //take first 5
    //return compnonets to rendee
    const playersList = playersCopy
    .sort((b, a) => parseInt(a.turnsSurvived) - parseInt(b.turnsSurvived))
    .slice(0,5)    
    .map((player) =>{
        return <PlayerItem player={player} key={player._id} />
    });

    return(
        <>
        <h4>Top 5 Best Players Ever!</h4>
        {playersList}
        </>
    )
}
export default PlayerList


// const sorted = [...players].sort((a, b) => parseInt(a.turnsSurvived) - parseInt(b.turnsSurvived));

//         //now return a mapping of the top 5
//         console.log("sorted list");
//         console.log(sorted);

//         sorted.slice(0, 5).map((player) => {
//             return <PlayerItem player={player} key={player._id}/>
//         });