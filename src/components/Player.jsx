import React, { useState } from "react";

const Player = ({initialName, symbol, isActive, onChangeName}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName);

  

    const onEditHandler = () => {
        setIsEditing((editing) => !editing);
        if (isEditing){
            onChangeName(symbol, playerName);
        }
    }

    // Event handler to capture changes in the input field
    const handleInputChange = (event) => {
        // Update the state with the new input value
        setPlayerName(event.target.value);
    };

    let editPlayerName = <span className="player-name">{playerName}</span>

    if (isEditing) {
        editPlayerName = (<input type="text" required value={playerName} onChange={handleInputChange} />)
    } 

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={onEditHandler}>{isEditing ? 'Save':'Edit'}</button>
          </li>
    )
}

export default Player;




