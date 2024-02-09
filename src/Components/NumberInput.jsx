import React from 'react';

function NumberInput(props) {

    return (
        <>
            <div className="homeScreenText">
                {props.text}
            </div>
            <div className="numberInput">
                <input type="number"
                       value={props.value}
                       min={props.min}
                       max={props.max}
                       onChange={(event => {
                           props.handleInput(event, props.type)
                       })}
                />
            </div>
        </>

    );
}

export default NumberInput;