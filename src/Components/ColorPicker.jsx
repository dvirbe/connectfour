// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';


function ColorPicker(props) {
    let chosenColor = "#000000"

    const defaultColor = () => {
        if (props.player === 1) {
            chosenColor = "#f60000"
        } else if (props.player === 2) {
            chosenColor = "#e3ff00"
        }
    }
    defaultColor()

    const [color, setColor] = useState(chosenColor);



    function handleColorChange(event) {
        setColor(event.target.value);
        props.setColor(event.target.value)
    }

    return (<>
            <div> player {props.player}</div>
            <div className="color-picker-container">
                <input type="color" value={color} onChange={handleColorChange}/>
            </div>
        </>
    );
}

export default ColorPicker
