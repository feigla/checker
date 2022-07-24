import {ICellCoordinates} from "../types/ICellCoordinates";
import {Board} from "../models/Board";

export const getSelectedAndClickCell = (
    selectedCellCoordinates: ICellCoordinates,
    clickCellCoordinates: ICellCoordinates,
    board: Board
    ) => {
    const selectedCell = board.getCell(selectedCellCoordinates.y, selectedCellCoordinates.x)
    const clickCell = board.getCell(clickCellCoordinates.y, clickCellCoordinates.x)
    return {selectedCell, clickCell}
}