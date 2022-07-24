import React, {FC, useEffect} from 'react';
import {Board} from "../models/Board";
import CellBlackComponent from "./CellBlackComponent";
import {Player} from "../models/Players";
import {Colors} from "../models/Colors";
import CellWhiteComponent from "./CellWhiteComponent";
import {useCell} from "../hooks/useCell";
import sessions from "../store/sessions";
import {observer} from "mobx-react-lite";
import {useSocket} from "../hooks/useSocket";

interface BoardComponentProps {
    board: Board,
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    setCurrentPlayer: (Player: Player) => void
}

const BoardComponent: FC<BoardComponentProps> = observer(({board, setBoard, currentPlayer, setCurrentPlayer}) => {
    const {selectedCell, click, setSelectedCell, setStillRequiredMove,} = useCell(board, currentPlayer)

    useSocket(board, setStillRequiredMove, setSelectedCell, setCurrentPlayer)

    useEffect(() => {
        highLightCells()
    }, [selectedCell])

    function highLightCells() {
        board.highLightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.copyBoard()
        setBoard(newBoard)
    }

    return (
        <div className={['board', sessions.isSideBlack ? 'rotateBoard' : ' ' ].join(' ')}>
            {board.cells.map((row, ind) =>
                <React.Fragment key={ind}>
                    {row.map((cell, ind) =>
                        <React.Fragment key={ind}>
                            {cell.color === Colors.BLACK
                                ?
                                <CellBlackComponent
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                    click={click}
                                />
                                :
                                <CellWhiteComponent
                                    key={cell.id}
                                />
                            }
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
})

export default BoardComponent;