import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";
import checkerWhiteKing from '../assets/checker-white-king/img.png'
import checkerBlackKing from '../assets/checker-black-king/img.png'

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    opened: boolean;
    id: number

    constructor(board: Board, y: number, x: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.opened = false;
        this.id = Math.random();
    }

    public isEnemy(target: Cell): boolean {
        if (target.figure)
            return this.figure?.color !== target.figure.color;
        return false
    }

    public isEmpty(): boolean {
        return this.figure === null
    }

    public getDiagonalVar (target: Cell) {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1
        return [dy, dx, absX, absY] as const
    }

    public checkEmptyDiagonal (target: Cell): boolean {
        const [dy, dx, absX, absY] = this.getDiagonalVar(target)
        if (absY !== absX) return false;

        for (let i = 1; i < absY; i++) {
            if (this.board.getCell(this.y + dy * i, this.x + dx * i).figure?.color === this.figure?.color)
                return false;
            if (this.figure &&
                this.isEnemy(this.board.getCell(this.y + dy * i, this.x + dx * i))
                && this.isEnemy(this.board.getCell(this.y + dy * (i + 1), this.x + dx * (i + 1))))
                return false;
        }
        return true
    }

    isEmptyDiagonal(target: Cell): boolean {
        return this.checkEmptyDiagonal(target)
    }

    isEmptyDiagonalOfRequiredCells(target: Cell): boolean {
        const [dy, dx, absY] = this.getDiagonalVar(target)
        if (!this.checkEmptyDiagonal(target)) return false;

        for (let i = 1; i < absY; i++) {
            if (this.isEnemy(this.board.getCell(this.y + dy * i, this.x + dx * i))) {
                let arr: Cell[] = []
                this.board.getRequiredCellsOfKing(this).forEach(item => {
                    if (item !== target
                        && this.board.isRequiredCellOfKing(item, dx, dy, (this.figure as Figure))
                        && !this.board.isRequiredCellOfKing(target, dx, dy, (this.figure as Figure))) {
                        arr.push(target)
                    }
                })
                return !arr.length;
            }
        }
        return false;
    }

    checkRequiredCellOfKing(target: Cell): boolean {
        const [dy, dx, absY] = this.getDiagonalVar(target)
        if (!this.checkEmptyDiagonal(target)) return false;

        for (let i = 1; i < absY; i++) {
            if (this.isEnemy(this.board.getCell(this.y + dy * i, this.x + dx * i))) {
                return true
            }
        }
        return false;
    }

    isEmptyDiagonalOfRequiredKingCells(target: Cell, dxPast: number, dyPast: number, currentFigure: Figure): boolean {
        const [dy, dx, absX, absY] = this.getDiagonalVar(target)
        if (absY !== absX) return false;
        if (dxPast !== dyPast && dx !== dy) return false;
        if (dxPast === dyPast && dx === dy) return false;

        for (let i = 1; i < absY; i++) {
            if (this.board.getCell(this.y + dy * i, this.x + dx * i).figure?.color === currentFigure.color)
                return false;
            if (currentFigure.cell.isEnemy(this.board.getCell(this.y + dy * i, this.x + dx * i))
                && currentFigure.cell.isEnemy(this.board.getCell(this.y + dy * (i + 1), this.x + dx * (i + 1))))
                return false;
        }
        for (let i = 1; i < absY; i++) {
            if (currentFigure.cell.isEnemy(this.board.getCell(this.y + dy * i, this.x + dx * i)))
                return true;
        }
        return false;
    }

    public moveChecker(target: Cell): boolean {
        const direction = this.figure?.color === Colors.WHITE ? -1 : 1
        if (this.x + 1 == target.x && this.y + direction == target.y) return true;
        return this.x - 1 == target.x && this.y + direction == target.y;
    }

    setChecker(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    setKing(figure: Figure, currentColor: Colors) {
        this.figure = figure
        this.figure.logo = currentColor === Colors.BLACK ? checkerBlackKing : checkerWhiteKing
        this.figure.cell = this
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigureNeed(target)
            if (target.y === 0 && this.figure.color === Colors.WHITE) {
                target.setKing(this.figure, Colors.WHITE)
            } else if (target.y === 7 && this.figure.color === Colors.BLACK) {
                target.setKing(this.figure, Colors.BLACK)
            } else {
                target.setChecker(this.figure)
            }
            this.figure = null
        }
    }
}