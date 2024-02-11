import React from "react";
import Disk from "./Disk";
import * as finals from "../Constants.js";
function Board(props) {

    const numberOfColumns = Number(props.columns);
    const numberOfRows = Number(props.rows);

    function handleDiskClick(column) {
        let tempBoard = props.boardLayout
        for (let i = numberOfRows -1; i >= 0; i--) {
            if (props.boardLayout[column ][i] === finals.EMPTY_DISK) {
                props.isPlayerOneTurn ? tempBoard[column][i] = finals.PLAYER_ONE :
                    tempBoard[column][i] = finals.PLAYER_TWO;
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
                if (props.boardLayout[x][y] === finals.PLAYER_ONE || props.boardLayout[x][y] === finals.PLAYER_TWO) {
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

    function tieChecker() {
        for (let i = 0; i < numberOfColumns; i++) {
            for (let j = 0; j < numberOfRows; j++) {
                if (props.boardLayout[i][j]=== finals.EMPTY_DISK) {
                    return false;
                }
            }
        }
        return true
    }


    function changeWin(winner) {
        props.changeWin(winner)
    }

    function checkWin() {
        let winner = fourInARowChecker(1, 0)
        if (winner !== finals.DEFAULT_WIN_SITUATION) {
            changeWin(winner)
            return
        }
        winner = fourInARowChecker(0, -1)
        if (winner !== finals.DEFAULT_WIN_SITUATION) {
            changeWin(winner)
            return
        }
        winner = fourInARowChecker(1, 1)
        if (winner !== finals.DEFAULT_WIN_SITUATION) {
            changeWin(winner)
            return
        }
        winner = fourInARowChecker(1, -1)
        if (winner !== finals.DEFAULT_WIN_SITUATION) {
            changeWin(winner)
            return
        }
        if (tieChecker()) {
            changeWin(finals.DRAW)
            return
        }
        return 0;
    }

    const drawBoard = props.boardLayout.map((columns, columnIndex) =>
        <div key={columnIndex} className={"boardRow"}>
            {columns.map((rows, rowIndex) =>
                <Disk color={props.color}
                      key={rowIndex}
                      row={rowIndex}
                      columns={columnIndex }
                      clicker={handleDiskClick}
                      type={diskType(rows)}
                      rowCount={numberOfRows}
                      columnCount={numberOfColumns}
                />
            )}
        </div>
    );

    function diskType(number) {
        let type = "disk"
        if (number === finals.PLAYER_ONE) {
            type = type.concat("Red")
        } else if (number === finals.PLAYER_TWO) {
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