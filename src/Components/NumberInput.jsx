import React, {useState} from 'react';

function NumberInput(props) {

    return (
        <>
            <div className="homeScreenText">
                {props.text}
            </div>
            <div className="numberInput">
                <input type="number"
                       defaultValue={props.defaultValue}
                       min={props.min}
                       max={props.max}
                       onInputCapture={props.handleInput}/>
            </div>
        </>

    );
}

export default NumberInput;