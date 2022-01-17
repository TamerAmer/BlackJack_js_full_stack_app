import PlayerItem from "./PlayerItem"
import '../css/PlayerList.css'

const PlayerList=({players}) => {

    //make deep copy, we don't want to alter list in state
    let playersCopy = [...players];

    //sort whole list (reversed (b,a))
    //take first 5
    //return components to render
    const playersList = playersCopy
    .sort((b, a) => parseInt(a.turnsSurvived) - parseInt(b.turnsSurvived))
    .slice(0,5)    
    .map((player) =>{
        return <PlayerItem player={player} key={player._id} />
    });

    return(
        <div className="player-list">
        <h4 className="list-title">Top 5 Best Players Ever!</h4>
        <div className="player-items"> {playersList} </div>
        </div>
    )
}
export default PlayerList