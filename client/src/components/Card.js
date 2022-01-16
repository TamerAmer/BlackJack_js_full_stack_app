const Card = ({card}) => {

    return (
        <>
            <img className="card" src={require ("../images/cards/" + card + ".png")}/>
        </>
    )
}

export default Card;