import React from 'react';
import * as finals from "../Constants.js";

function Disk(props) {

    const size = () => {
        return ((64 /props.rowCount) > (100 /props.columnCount)) ? (100 /props.columnCount) : (64 /props.rowCount)
    }
    const color = () => {
        if (props.type === "diskRed") {
            return props.color[finals.PLAYER_ONE_INDEX]
        } else if (props.type === "diskYellow") {
            return props.color[finals.PLAYER_TWO_INDEX]
        }
    }

    return (
        <>
            <div row={props.row}
                 column={props.columns}
                 onClick={() => props.clicker(props.columns)}
                 key={props.row + "," + props.columns}
                 className={props.type}
                 style={{backgroundColor: color(), width: String(size()) + "vh", height: String(size()) + "vh"}}
            ></div>
        </>
    );
}

export default Disk;