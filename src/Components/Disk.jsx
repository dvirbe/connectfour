import React from 'react';

function Disk(props) {

    const color=() => {
        if (props.type === "diskRed") {
            return props.color[0]
        } else if (props.type === "diskYellow") {
            return props.color[1]
        }
    }

    return (
        <>
            <div row={props.row}
                 column={props.columns}
                 onClick={() => props.clicker(props.columns)}
                 key={props.row + "," + props.columns}
                 className={props.type}
                 style={{backgroundColor: color()}}></div>
        </>
    );
}

export default Disk;