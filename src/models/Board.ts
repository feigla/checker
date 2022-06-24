import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Checker} from "./figures/Checkers";
import checkerWhiteKing from '../assets/checker-white-king/img.png'
import checkerBlackKing from '../assets/checker-black-king/img.png'
import {Figure} from "./figures/Figure";

export class Board {
    cells: Cell[][] = []

    public DefaultCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 == 0) {
                    row.push(new Cell(this, i, j, Colors.WHITE, null))
                } else {
                    row.push(new Cell(this, i, j, Colors.BLACK, null))
                }
            }
            this.cells.push(row)
        }
    }

    public getCell(y: number, x: number) {
        return this.cells[y][x]
    }

    public addPawns() {
        for (let i = 0; i < 8; i++) {
            for (let j = i % 2 == 0 ? 1 : 0; j < 8; j = j + 2) {
                if (i < 3) {
                    new Checker(this.getCell(i, j), Colors.BLACK)
                }
                if (i > 4) {
                    new Checker(this.getCell(i, j), Colors.WHITE)
                }
            }
        }
    }

    public copyBoard(): Board {
        const newBoard = new Board()
        newBoard.cells = this.cells
        return newBoard
    }

    public highLightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = i % 2 == 0 ? 1 : 0; j < row.length; j = j + 2) {
                const target = row[j]
                target.opened = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    public isNeed(selectedCell: Cell) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = i % 2 == 0 ? 1 : 0; j < row.length; j = j + 2) {
                const target = row[j]
                if (selectedCell.figure?.logo !== checkerWhiteKing
                    && selectedCell.figure?.logo !== checkerBlackKing
                    && !target.figure
                    && !!selectedCell?.figure?.moveCheckerNeed(target)) return true;
                if (selectedCell.figure?.logo === checkerWhiteKing
                    && !target.figure
                    && !!selectedCell?.isEmptyDiagonalNeed(target)) return true;
                if (selectedCell.figure?.logo === checkerBlackKing
                    && !target.figure
                    && !!selectedCell?.isEmptyDiagonalNeed(target)) return true;
            }
        }
        return false
    }

    public isCellKingNeed(selectedCell: Cell, dx: number, dy: number, currentFigure: Figure) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = i % 2 == 0 ? 1 : 0; j < row.length; j = j + 2) {
                const target = row[j]
                if (selectedCell.isEmptyDiagonalCellKingNeed(target, dx, dy, currentFigure)) return true;
            }
        }
        return false
    }

    public getArrayCellKingNeed(selectedCell: Cell): Cell[] {
        const arr: Cell[] = []
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = i % 2 == 0 ? 1 : 0; j < row.length; j = j + 2) {
                const target = row[j]
                if (selectedCell.figure?.logo === checkerWhiteKing
                    && !target.figure
                    && !!selectedCell?.checkCellKingNeed(target)) {
                    arr.push(target)
                }
                if (selectedCell.figure?.logo === checkerBlackKing
                    && !target.figure
                    && !!selectedCell?.checkCellKingNeed(target)) {
                    arr.push(target)
                }
            }
        }
        return arr
    }

    public checkNeeded(currentColor: Colors): Cell[] {
        let arr = []
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = i % 2 == 0 ? 1 : 0; j < row.length; j = j + 2) {
                const target = row[j]
                if (target.figure?.color === currentColor && this.isNeed(target)) {
                    arr.push(target)
                }
            }
        }
        return arr
    }
}