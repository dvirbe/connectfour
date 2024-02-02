import React from 'react';
function Disk(props) {
    return (
        <div id={props.row+","+props.colums} className = {props.type}></div>
    );
}

export default Disk;