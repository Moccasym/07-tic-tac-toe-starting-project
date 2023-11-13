import React, { useState } from "react";

const Player = ({name, symbol}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    // const [name, setName] = useState('player 1')
    // const [symbol, setSymbol] = useState('x')

    const [inputValue, setInputValue] = useState('');

    // Event handler to capture changes in the input field
    const handleInputChange = (event) => {
      // Update the state with the new input value
      setInputValue(event.target.value);
    };


    const onEditHandler = () => {
        setIsEditing(true)
    }

    const onSaveHandler = () => {
        setIsSaved(true)
    }



    if (isEditing === true) {
        return(
            <li>
            <span className="player">
              <input className="player-name" value={inputValue} onChange={handleInputChange}></input>
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={onSaveHandler}>Save</button>
          </li>
        )
        }else if (isSaved === true){
            return(
                <li>
                <span className="player">
                  <span className="player-name">{inputValue}</span>
                  <span className="player-symbol">{symbol}</span>
                </span>
              </li>
            )
    } else {
    return(
        <li>
            <span className="player">
              <span className="player-name">{name}</span>
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={onEditHandler}>Edit</button>
          </li>
    )}
}

export default Player;