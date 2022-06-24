import React, { useEffect, useState } from 'react';
import './styles/app.css'
import './styles/zero.css'
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Players";
import {Colors} from "./models/Colors";
import Timer from "./components/Timer";

const App = ()=> {
    const [board, setBoard] = useState(new Board())
    const [blackPlayer] = useState(new Player(Colors.BLACK))
    const [whitePlayer] = useState(new Player(Colors.WHITE))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
    const [startGame, setStartGame] = useState<boolean>(false)
    useEffect(() => {
        start()
    }, [])

    const swapPlayer = () => {
        setStartGame(true)
        currentPlayer?.color == whitePlayer.color ? setCurrentPlayer(blackPlayer) : setCurrentPlayer(whitePlayer)
    }

    function start() {
        const newBoard = new Board()
        setCurrentPlayer(whitePlayer)
        newBoard.DefaultCells()
        newBoard.addPawns()
        setBoard(newBoard)
    }

    return (
        <div className='container'>
            <BoardComponent
                board={board}
                setBoard={setBoard}
                swapPlayer={swapPlayer}
                currentPlayer={currentPlayer}
            />
            <Timer
                currentPlayer={currentPlayer}
                restart={start}
                setStartGame={setStartGame}
                startGame={startGame}
                setCurrentPlayer={setCurrentPlayer}
            />
        </div>
    );
};

export default App;