import {useEffect, useState} from "react";
import {Cell} from "../models/Cell";
import {Board} from "../models/Board";
import {Player} from "../models/Players";
import sessions from "../store/sessions";
import {ICellCoordinates} from "../types/ICellCoordinates";
import {Colors} from "../models/Colors";

export function useCell(board: Board, currentPlayer: Player | null) {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    const [requiredMoveCells, setRequiredMoveCells] = useState<Cell[]>([])

    const [stillRequiredMove, setStillRequiredMove] = useState<boolean>(false)
    const [firstRequiredMove, setFirstRequiredMove] = useState<boolean>(false)

    const click = (cell: Cell) => {
        const clickCellCoordinates: ICellCoordinates = {y: cell.y, x: cell.x}
        switch (true) {
            case selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell):
                const selectedCellCoordinates: ICellCoordinates = {y: (selectedCell as Cell).y, x: (selectedCell as Cell).x}
                sessions.socket?.send(JSON.stringify({
                    id: sessions.session?.sessionId,
                    event: 'move',
                    selectedCellCoordinates,
                    clickCellCoordinates,
                    currentPlayerColor: currentPlayer?.color,
                    firstRequiredMove
                }))
                break;

            case !requiredMoveCells.length && cell.figure && cell.figure.color === currentPlayer?.color:
                sessions.socket?.send(JSON.stringify({
                    id: sessions.session?.sessionId,
                    event: 'click',
                    currentPlayerColor: currentPlayer?.color,
                    clickCellCoordinates
                }))
                break;

            case requiredMoveCells.length > 0:
                requiredMoveCells?.forEach(item => {
                    if (cell === item) {
                        setFirstRequiredMove(true)
                        const requiredMoveCellCoordinates: ICellCoordinates = {y: cell.y, x: cell.x}
                        sessions.socket?.send(JSON.stringify({
                            id: sessions.session?.sessionId,
                            event: 'click',
                            currentPlayerColor: currentPlayer?.color,
                            clickCellCoordinates: requiredMoveCellCoordinates
                        }))
                    }
                })
                break;
        }
    }

    useEffect(() => {
        setRequiredMoveCells(board.getRequiredCells(currentPlayer?.color as Colors))
        console.log(requiredMoveCells)
        setStillRequiredMove(false)
        setFirstRequiredMove(false)
    }, [currentPlayer, stillRequiredMove])

    return {
        click,
        selectedCell,
        setStillRequiredMove,
        setSelectedCell,
    }
}