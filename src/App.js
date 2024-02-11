import './App.css';
import Board from "./Components/Board";
import ColorPicker from "./Components/ColorPicker";
import React from "react";
import NumberInput from "./Components/NumberInput";
import * as finals from "./Constants";

class App extends React.Component {

    state = {
        boardLayout: [],
        gameInProgress: finals.DEFAULT_GAME_PROGRESS,
        isPlayerOneTurn: finals.DEFAULT_IS_PLAYER_ONE_TURN,
        colors: [finals.DEFAULT_PLAYER_ONE_COLOR, finals.DEFAULT_PLAYER_TWO_COLOR],
        someoneWin: finals.DEFAULT_WIN_SITUATION,
        rows: finals.DEFAULT_ROWS_AMOUNT,
        columns: finals.DEFAULT_COLUMNS_AMOUNT,
        time: finals.TIME_PER_TURN
    }

    timer() {
        setInterval(() => {
            this.setState({time: this.state.time - 1})
        }, finals.SECOND, this.state.gameInProgress)
    }

    timeOut() {
        setInterval(() => {
            if (this.state.time <= finals.TIME_UP) {
                this.changeTurn()
            }
        }, finals.SECOND, this.state.gameInProgress)
    }


    changeWin = (winner) => {
        this.setState({someoneWin: winner});
    }

    changeTurn() {
        this.setState({isPlayerOneTurn: !this.state.isPlayerOneTurn});
        this.setState({time: finals.TIME_PER_TURN});
    }

    startGame() {
        this.setState({gameInProgress: !this.state.gameInProgress});
        this.timer()
        this.timeOut()
    }

    changeBoardLayout = (newLayout) => {
        this.setState({boardLayout: newLayout})
    }

    setColor = (newColor, index) => {
        let temp = this.state.colors
        temp[index] = newColor
        this.setState({colors: temp})

    }
    makeTable = () => {
        const temp = []
        for (let i = 0; i < Number(this.state.columns); i++) {
            const innerArray = new Array(Number(this.state.rows)).fill(finals.EMPTY_DISK);
            temp.push(innerArray);
        }
        this.changeBoardLayout(temp)
    }

    hexToRgb(hex) {
        const match = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (!match) {
            return null;
        }
        const r = parseInt(match[1], 16);
        const g = parseInt(match[2], 16);
        const b = parseInt(match[3], 16);
        return [r, b, g];
    }

    colorAreEqual = () => {
        const one = this.hexToRgb(this.state.colors[0])
        const two = this.hexToRgb(this.state.colors[1])
        const difference = 75
        return Math.abs(one[0] - two[0]) <= difference && Math.abs(one[1] - two[1]) <= difference && Math.abs(one[2] - two[2]) <= difference
    }

    handleBoardSizeInput = (event, field) => {
        let temp = event.target.value
        if (event.target.value > finals.MAX_SIZE_INPUT) {
            temp = finals.MAX_SIZE_INPUT
        }
        if (event.target.value < finals.MIN_SIZE_INPUT) {
            temp = finals.MIN_SIZE_INPUT
        }
        if (field === "rows") {
            this.setState({rows: temp})
        } else if (field === "columns") {
            this.setState({columns: temp})
        }

    }

    restartGame = () => {
        this.makeTable()
        this.setState({someoneWin: finals.DEFAULT_WIN_SITUATION})
        this.setState({isPlayerOneTurn: finals.DEFAULT_IS_PLAYER_ONE_TURN})
        this.setState({time: finals.TIME_PER_TURN})
    }

    gameOverText = () => {
        let text
        if (this.state.someoneWin !== finals.EMPTY_DISK) {
            if (this.state.someoneWin === finals.DRAW) {
                text = "Draw"
            } else if (this.state.someoneWin === finals.PLAYER_ONE || this.state.someoneWin === finals.PLAYER_TWO) {
                text = ("Player " + this.state.someoneWin + " Won")
            }
            return (
                <>
                    <div className={"win"}>
                        {text}
                    </div>
                    <button className={"restartButton"}
                            onClick={this.restartGame}>
                        Restart Game
                    </button>
                </>
            )
        }
    }

    colorPicker(index) {
        return (
            <ColorPicker
                setColor={this.setColor}
                index={index}
                color={this.state.colors[index]}
            />
        )
    }

    numberLimitation(value, type) {
        return (
            <NumberInput
                type={type}
                value={value}
                min={finals.MIN_SIZE_INPUT}
                max={finals.MAX_SIZE_INPUT}
                handleInput={this.handleBoardSizeInput}
                text={"number of " + type + ":"}
            />)
    }

    render() {
        document.title = "Connect Four"
        return (<>
                <div className={"App"}>
                    <header>
                        <div> Connect Four</div>
                    </header>

                    {this.state.gameInProgress ? (
                        <div>
                            <div
                                className={"gameScreenText"}>{this.state.isPlayerOneTurn ? ("player 1") : "player 2"} turn
                            </div>
                            <div
                                className={"timer"}>{this.state.time} second left
                            </div>
                            {this.gameOverText()}


                            <Board
                                boardLayout={this.state.boardLayout}
                                isPlayerOneTurn={this.state.isPlayerOneTurn}
                                rows={this.state.rows}
                                columns={this.state.columns}
                                color={this.state.colors}
                                changePlayerTurn={() => {
                                    this.changeTurn()
                                }}
                                changeBoardLayout={this.changeBoardLayout}
                                changeWin={(winner) => this.changeWin(winner)}
                            />
                        </div>
                    ) : (
                        <div>
                            {this.colorPicker(finals.PLAYER_ONE_INDEX)}

                            {this.colorPicker(finals.PLAYER_TWO_INDEX)}

                            {this.numberLimitation(this.state.rows, "rows")}

                            {this.numberLimitation(this.state.columns, "columns")}

                            {this.colorAreEqual() ? (
                                <div className={"homeScreenText"}>both players color cannot be the same, please change
                                    color</div>
                            ) : (

                                <button className={"startButton"}
                                        onClick={() => {
                                            this.startGame()
                                            this.makeTable()
                                        }}>start game
                                </button>
                            )}
                        </div>
                    )}
                </div>

            </>
        )
    }

}

export default App;