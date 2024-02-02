import React from "react";
import Disk from "./Disk";

function Board(props) {
    const arrayOfArrays = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]
    const row = 6;
    const column = 7;
    const drawboard = arrayOfArrays.map((colums,columIndex) =>
        <>
            <div>
                {colums.map((rowIndex, num) =>
                    <>
                       <Disk row={num+1} colums={columIndex+1} type="disk"/>
                    </>
                )}
            </div>
        </>
    );


    return (
        <>
            <div className="board">
                {drawboard}
            </div>
        </>
    )
}


export default Board;