import './App.css';
import Board from "./Components/Board";
import ColorPicker from "./Components/ColorPicker";
import React, {useState} from "react";
import colorPicker from "./Components/ColorPicker";

class App extends React.Component {
    state = {
        gameInProgress :false,
        isPlayerOneTurn: true,
        player1_Color: "#f60000",
        player2_Color: "#e3ff00",
        someoneWin: false,
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


    render() {
        return (<>
                <header className={"header"}>
                    <div> connect four game</div>
                </header>
                {this.state.gameInProgress ? (
                    <div>
                        <Board isPlayerOneTurn={this.state.isPlayerOneTurn}
                               changePlayerTurn={()=>{this.changeTurn()}}
                               color={[this.state.player1_Color, this.state.player2_Color] }/>
                    </div>
                ) : (
                    <div className="App">
                        <ColorPicker setColor={this.setColor} player={1}/>
                        <ColorPicker setColor={this.setColor2} player={2}/>
                        {<button onClick={() => {
                            this.startGame()
                        }}>start game</button>}

                        <div className="color-picker-container">
                            <input type="number" value={6} />
                        </div>
                    </div>
                )}
            </>
        )
    }

}

export default App;