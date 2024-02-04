import './App.css';
import Board from "./Components/Board";
import ColorPicker from "./Components/ColorPicker";
import React, {useState} from "react";
import colorPicker from "./Components/ColorPicker";

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
                            <ColorPicker setColor={this.setColor} player={1}/>
                            <ColorPicker setColor={this.setColor2} player={2}/>

                            <div className="input">
                                <input type="number"
                                       value={this.state.rows}
                                       min={1}
                                       onInputCapture={this.handleRowInput}/>
                            </div>
                            <div className="input">
                                <input type="number"
                                       value={this.state.columns}
                                       onInputCapture={this.handleColumnInput}/>
                            </div>

                            {<button onClick={() => {
                                this.startGame()
                            }}>start game</button>}
                        </div>
                    )}
                </div>

            </>
        )
    }

}

export default App;