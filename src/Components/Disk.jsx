import React from 'react';

function Disk(props) {

    const size =()=>{
       return  ((65/props.rowCount)>(95/props.columnCount))?(95/props.columnCount):(65/props.rowCount)
    }
    const color = () => {
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
                 style={{backgroundColor: color(), width:String(size())+"vh",height:String(size())+"vh"}}
            ></div>
        </>
    );
}

export default Disk;