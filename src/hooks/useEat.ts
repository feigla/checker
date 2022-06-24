import {useState} from "react";
import {Cell} from "../models/Cell";
import {Board} from "../models/Board";
import {Player} from "../models/Players";

export function useEat(board: Board, swapPlayer: Function, currentPlayer: Player | null){
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [cellNeed, setCellNeed] = useState<Cell[]>([])

    const [isNeedYet, setIsNeedYet] = useState<boolean>(false)
    const [isOneEat, setIsOneEat] = useState<boolean>(false)


    const click = (cell: Cell) => {
        switch (true){
            case selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell):
                selectedCell?.moveFigure(cell)
                if (board.isNeed(cell) && isOneEat) {
                    setIsNeedYet(true)
                    setSelectedCell(null)
                } else {
                    swapPlayer()
                    setSelectedCell(null)
                }
                break

            case !cellNeed.length && cell.figure && cell.figure.color === currentPlayer?.color:
                setSelectedCell(cell)
                break

            case cellNeed.length > 0:
                cellNeed?.forEach(item => {
                    if (cell === item) {
                        setSelectedCell(cell)
                        setIsOneEat(true)
                    }
                })
                break
        }
    }

    return {
        click,
        isNeedYet,
        selectedCell,
        isOneEat,
        cellNeed,
        setCellNeed,
        setIsNeedYet,
        setIsOneEat
    }
}