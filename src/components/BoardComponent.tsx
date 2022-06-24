import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellBlackComponent from "./CellBlackComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Players";
import {Colors} from "../models/Colors";
import CellWhiteComponent from "./CellWhiteComponent";
import {useEat} from "../hooks/useEat";

interface BoardComponentProps {
    board: Board,
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FC<BoardComponentProps> = ({board, setBoard, swapPlayer, currentPlayer}) => {


    const {
        selectedCell,
        isNeedYet,
        isOneEat,
        cellNeed,
        click,
        setCellNeed,
        setIsNeedYet,
        setIsOneEat
    } = useEat(board,swapPlayer,currentPlayer)

    useEffect(() => {
        highLightCells()
    }, [selectedCell])

    useEffect(() => {
        setCellNeed(board.checkNeeded(currentPlayer?.color as Colors))
        setIsNeedYet(false)
        setIsOneEat(false)
    }, [currentPlayer, isNeedYet])



    function highLightCells() {
        board.highLightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.copyBoard()
        setBoard(newBoard)
    }

    return (
        <div className='board'>
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
                                    currentPlayer={currentPlayer}
                                />
                                : <CellWhiteComponent
                                    key={cell.id}
                                />
                            }
                        </React.Fragment>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default BoardComponent;