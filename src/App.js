import './App.css';
import Board from "./Components/Board";
import ColorPicker from "./Components/ColorPicker";
import React from "react";
import NumberInput from "./Components/NumberInput";


class App extends React.Component {
    state = {
        gameInProgress: false,
        isPlayerOneTurn: true,
        player1_Color: "#f60000",
        player2_Color: "#e3ff00",
        someoneWin: false,
        rows: 6,
        columns: 7,
        winner: 0,

    }


    changeWin = () => {
        this.setState({someoneWin: !this.state.someoneWin});
    }

    changeTurn() {
        this.setState({isPlayerOneTurn: !this.state.isPlayerOneTurn});
    }

    startGame() {
        this.setState({gameInProgress: !this.state.gameInProgress});
    }

    setColor = (newColor) => {
        this.setState({player1_Color: newColor})
    }
    setColor2 = (newColor) => {
        this.setState({player2_Color: newColor})
    }
    handleRowInput = (event) => {
        this.setState({rows: event.target.value})
    }

    handleColumnInput = (event) => {
        this.setState({columns: event.target.value})
    }

    render() {
        return (<>
                <div className={"App"}>
                    <header>
                        <div> connect four</div>
                    </header>

                    {this.state.gameInProgress ? (

                        <div>
                            <Board isPlayerOneTurn={this.state.isPlayerOneTurn}
                                   changePlayerTurn={() => {
                                       this.changeTurn()
                                   }}
                                   rows={this.state.rows}
                                   columns={this.state.columns}
                                   color={[this.state.player1_Color, this.state.player2_Color]}/>
                        </div>
                    ) : (
                        <div>
                            <ColorPicker
                                setColor={this.setColor}
                                player={1}
                            />

                            <ColorPicker
                                setColor={this.setColor2}
                                player={2}
                            />

                            <NumberInput
                                defaultValue={this.state.rows}
                                min={4}
                                max={20}
                                handleInput={this.handleRowInput}
                                step = {1}
                                text={"number of rows:"}
                            />

                            <NumberInput
                                defaultValue={this.state.columns}
                                min={4}
                                max={20}
                                step = {1}
                                handleInput={this.handleColumnInput}
                                text={"number of columns:"}
                            />

                            {<button onClick={() => {
                                this.startGame()
                            }}>start game
                            </button>}
                        </div>
                    )}
                </div>

            </>
        )
    }

}

export default App;