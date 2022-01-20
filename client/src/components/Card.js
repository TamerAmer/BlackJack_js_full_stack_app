import { useState, useEffect } from "react";
const Card = ({ card, className }) => {
   
    const locationA = require ("../images/cards/" + card + "a.png")
    const locationB = require ("../images/cards/" + card + "b.png")
    const [imageLocation, setImageLocation] = useState(locationA)
    const [counter, setCounter] = useState(0);


    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript  
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
        toggle();
        }, randomIntFromInterval(200,500) );
    
        return () => {
          clearTimeout(timeout);
        };
      }, [counter]);

  
    const toggle = () =>
    {
        //use timer to advance counter and ever 4th "frame", set image location alternate card image
       // console.log("counter = " + counter);
        if(counter < 10)  
        {                  
            setCounter(counter+1);
            //need seperate flags because location after setting is different from varialbe declared
            setImageLocation(locationA);
        }
        else
        {
            setCounter(0)
            setImageLocation(locationB);
        }

    }
    return (
        <>
            <img className={className} src={imageLocation}/>  
        </>
    )
}

export default Card;

{/* <img className="card" src={require ("../images/cards/" + card + ".png")}/> */ }
{/* <img className="card" src={require ("../images/cards/" + card + "1"+ ".png")}/> */ }