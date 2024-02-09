import React from 'react';


function ColorPicker(props) {
    return (<>
            <div className={"homeScreenText"}>
                player {props.index + 1} color:
            </div>
            <div className="color-picker-container">
                <input
                    type="color"
                    value={props.color}
                    onChange={(event) => {
                        props.setColor(event.target.value, props.index)
                    }}
                />
            </div>
        </>
    );
}

export default ColorPicker
