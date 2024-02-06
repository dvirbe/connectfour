import React, {useState} from "react";
import Disk from "./Disk";

function Board(props) {

    const numberOfColumns = Number(props.columns);
    const numberOfRows = Number(props.rows);

    const makeTable = () => {
        const temp = []
        for (let i = 0; i < numberOfColumns; i++) {
            const innerArray = new Array(numberOfRows).fill(0);
            temp.push(innerArray);
        }
        return temp
    }
    const [boardLayout, setBoardLayout] = useState(() => makeTable());

    function handleDiskPlacementInColumn(column) {
        let tempBoard = boardLayout
        for (let i = numberOfRows - 1; i >= 0; i--) {
            if (boardLayout[column - 1][i] === 0) {
                props.isPlayerOneTurn ? tempBoard[column - 1][i] = 1 :
                    tempBoard[column - 1][i] = 2;
                setBoardLayout(tempBoard);
                checkWin()
                props.changePlayerTurn();
                break;
            }
        }
    }

    //
    function fourInARowChecker(xOffset, yOffset) {
        for (let x = 0; x < numberOfColumns; x++) {
            for (let y = 0; y < numberOfRows; y++) {
                if (boardLayout[x][y] === 1 || boardLayout[x][y] === 2) {
                    if (
                        x + (xOffset * 3) < numberOfRows &&
                        x + (xOffset * 3) >= 0 &&
                        y + (yOffset * 3) < numberOfColumns &&
                        y + (yOffset * 3) >= 0
                    ) {
                        if (boardLayout[x][y] === boardLayout[x + xOffset][y + yOffset]) {
                            if (boardLayout[x][y] === boardLayout[x + (xOffset * 2)][y + (yOffset * 2)]) {
                                if (boardLayout[x][y] === boardLayout[x + (xOffset * 3)][y + (yOffset * 3)]) {
                                    return boardLayout[x][y]
                                }
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    function checkWin() {
        let temp = fourInARowChecker(1, 0)
        if (temp !== 0) {
            console.log(temp + "winner")
            return temp
        }
        temp = fourInARowChecker(0, -1)
        if (temp !== 0) {
            console.log(temp + "winner")
            return temp
        }
        temp = fourInARowChecker(1, 1)
        if (temp !== 0) {
            console.log(temp + "winner")
            return temp
        }
        temp = fourInARowChecker(1, -1)
        if (temp !== 0) {
            console.log(temp + "winner")
            return temp
        }

        return 0;
    }

    const drawBoard = boardLayout.map((columns, columnIndex) =>
        <div key={columnIndex}>
            {columns.map((rows, rowIndex) =>

                <Disk color={props.color}
                      key={rowIndex}
                      row={rowIndex + 1}
                      columns={columnIndex + 1}
                      clicker={handleDiskPlacementInColumn}
                      type={diskType(rows)}/>
            )}
        </div>
    );

    function diskType(number) {
        let type = "disk"
        if (number === 1) {
            type = type.concat("Red")
        } else if (number === 2) {
            type = type.concat("Yellow")
        }
        return type
    }

    return (
        <>
            <div className="board">
                {drawBoard}
            </div>
        </>
    )
}

export default Board;