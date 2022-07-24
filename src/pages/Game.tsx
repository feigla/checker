import React, {useEffect, useState} from 'react';
import BoardComponent from "../components/BoardComponent";
import {Board} from "../models/Board";
import {Player} from "../models/Players";
import SessionForm from "../components/SessionForm";
import UiModal from "../components/UI/modal/UiModal";
import players from './../models/PlayersColor'
import {observer} from "mobx-react-lite";

const Game = observer(() => {
    const [board, setBoard] = useState(new Board())
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
       start()
    }, [])

    const start = () => {
        const newBoard = new Board()
        setCurrentPlayer(players.whitePlayer)
        newBoard.DefaultCells()
        newBoard.addPawns()
        setBoard(newBoard)
    }

    return (
        <div className='main container'>
            <UiModal>
                <SessionForm/>
            </UiModal>
            <BoardComponent
                board={board}
                setCurrentPlayer={setCurrentPlayer}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
            />
        </div>
    );
});

export default Game;