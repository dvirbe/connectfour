import './App.css';
import Board from "./Components/Board";
import ColorPicker from "./Components/ColorPicker";
import React from "react";
import NumberInput from "./Components/NumberInput";

class App extends React.Component {

    state = {
        boardLayout: [],
        gameInProgress: false,
        isPlayerOneTurn: true,
        colors: ["#f60000", "#e3ff00"],
        someoneWin: 0,
        rows: 6,
        columns: 7,
        winner: 0,
        time: 10
    }


    timer() {
        setInterval(() => {
            this.setState({time: this.state.time - 1})
        }, 1000, this.state.gameInProgress)
    }

    timeOut() {
        setInterval(() => {
            if (this.state.time <= 0) {
                this.changeTurn()
            }
        }, 1000, this.state.gameInProgress)
    }


    changeWin = (winner) => {
        this.setState({someoneWin: winner});
    }

    changeTurn() {
        this.setState({isPlayerOneTurn: !this.state.isPlayerOneTurn});
        this.setState({time: 10});
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
            const innerArray = new Array(Number(this.state.rows)).fill(0);
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
        if (event.target.value > 20) {
            temp = 20
        }
        if (event.target.value < 4) {
            temp = 4
        }
        if (field === "rows") {
            this.setState({rows: temp})
        } else if (field === "columns") {
            this.setState({columns: temp})
        }

    }

    restartGame = () => {
        this.makeTable()
        this.setState({someoneWin: 0})
        this.setState({isPlayerOneTurn: true})
        this.setState({time: 10})
    }

    winOrDrawTextChanger = () => {
        let text
        if (this.state.someoneWin !== 0) {
            if (this.state.someoneWin === 999) {
                text = "Draw"
            } else if (this.state.someoneWin === 1 || this.state.someoneWin === 2) {
                text = ("Player " + this.state.someoneWin + " Won")
            }
            return (
                <>
                    <div className={"win "}>
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

    colorPicker(number) {
        return (
            <ColorPicker
                setColor={this.setColor}
                index={number}
                color={this.state.colors[number]}
            />
        )
    }

    numberLimitation(props, type) {
        return (
            <NumberInput
                type={type}
                value={props}
                min={4}
                max={20}
                handleInput={this.handleBoardSizeInput}
                step={1}
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
                            {this.winOrDrawTextChanger()}


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
                            {this.colorPicker(0)}

                            {this.colorPicker(1)}

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