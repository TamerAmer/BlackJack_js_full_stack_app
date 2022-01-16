const PlayAgain = ({turnEndMessage, onPlayAgain}) => {

    const handlePlayAgain = () => {
        onPlayAgain();
    }

    return(
        <>
            <h1>{turnEndMessage}</h1>
            <button onClick={handlePlayAgain}>Play Another Turn</button>
        </>
    )
}

export default PlayAgain;