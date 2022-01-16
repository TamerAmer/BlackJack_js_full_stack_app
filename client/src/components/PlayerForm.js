import React,{useState} from "react";
import { postPlayer } from "../helpers/DBHelpers";

const PlayerForm=({addPlayer}) => {

    const [name, setName] = useState("");

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    };

    
    const handleFormSubmit = (evt) => {

        //stop post request to current url
        evt.preventDefault();

        if(!name)
        {
            console.log("Empty name, returning");
            return;
        }        
        
        const formData =  {
            name: name,
            currentMoney: 100,
            turnsSurvived: 0
        }

        //update database with a promise, this returns our inserted object
        //then once task is finished, update front end with the received object
        //this means the front end will now have the id asigned by the database
        postPlayer(formData)
        .then((data) =>
        {
            
            addPlayer(data);
        })

        console.log("form submitted");
    }
    

    return(        
        <form className="player-form" onSubmit={handleFormSubmit}>
            <input            
                type="text"
                placeholder="Enter player name!"
                value={name}
                onChange={handleNameChange}
            />
            <button type="submit">Play!</button>
        </form>
    )
}
export default PlayerForm
