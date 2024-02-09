import React from "react";
import Disk from "./Disk";

function Board(props) {

    const numberOfColumns = Number(props.columns);
    const numberOfRows = Number(props.rows);

    function handleDiskPlacementInColumn(column) {
        let tempBoard = props.boardLayout
        for (let i = numberOfRows - 1; i >= 0; i--) {
            if (props.boardLayout[column - 1][i] === 0) {
                props.isPlayerOneTurn ? tempBoard[column - 1][i] = 1 :
                    tempBoard[column - 1][i] = 2;
                props.changeBoardLayout(tempBoard);
                checkWin()
                props.changePlayerTurn();
                break;
            }
        }
    }

    function fourInARowChecker(xOffset, yOffset) {

        for (let x = 0; x < numberOfColumns; x++) {
            for (let y = 0; y < numberOfRows; y++) {
                if (props.boardLayout[x][y] === 1 || props.boardLayout[x][y] === 2) {
                    if (
                        x + (xOffset * 3) < numberOfColumns &&
                        x + (xOffset * 3) >= 0 &&
                        y + (yOffset * 3) < numberOfRows &&
                        y + (yOffset * 3) >= 0
                    ) {
                        if (props.boardLayout[x][y] === props.boardLayout[x + xOffset][y + yOffset]) {
                            if (props.boardLayout[x][y] === props.boardLayout[x + (xOffset * 2)][y + (yOffset * 2)]) {
                                if (props.boardLayout[x][y] === props.boardLayout[x + (xOffset * 3)][y + (yOffset * 3)]) {
                                    return props.boardLayout[x][y]
                                }
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    function changeWin(winner) {
        props.changeWin(winner)
    }

    function checkWin() {
        let winner = fourInARowChecker(1, 0)
        if (winner !== 0) {
            changeWin(winner)
            return winner
        }
        winner = fourInARowChecker(0, -1)
        if (winner !== 0) {
            changeWin(winner)
            return winner
        }
        winner = fourInARowChecker(1, 1)
        if (winner !== 0) {
            changeWin(winner)
            return winner
        }
        winner = fourInARowChecker(1, -1)
        if (winner !== 0) {
            changeWin(winner)
            return winner
        }

        return 0;
    }

    const drawBoard = props.boardLayout.map((columns, columnIndex) =>
        <div key={columnIndex}>
            {columns.map((rows, rowIndex) =>
                <Disk color={props.color}
                      key={rowIndex}
                      row={rowIndex + 1}
                      columns={columnIndex + 1}
                      clicker={handleDiskPlacementInColumn}
                      type={diskType(rows)}
                      rowCount={numberOfRows}
                      columnCount={numberOfColumns}
                />
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