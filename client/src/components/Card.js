const Card = ({card, className}) => {

    return (
        <>
            <img className={className} src={require ("../images/cards/" + card + ".png")}/>
        </>
    )
}

export default Card;