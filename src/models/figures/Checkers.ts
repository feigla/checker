import {Figure} from "./Figure";
import checkerWhite from '../../assets/checker-white/img.png'
import checkerBlack from '../../assets/checker-black/img.png'
import checkerWhiteKing from '../../assets/checker-white-king/img.png'
import checkerBlackKing from '../../assets/checker-black-king/img.png'
import {Colors} from "../Colors";
import {Cell} from "../Cell";
export class Checker extends Figure {

    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.logo = color === Colors.BLACK ? checkerBlack : checkerWhite
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false;

        if (this.logo !== checkerBlackKing
            && this.logo !== checkerWhiteKing
            && this.cell.board.isRequired(this.cell as Cell)
            && this.moveCheckerNeed(target))
            return true;
        if (!this.cell.board.isRequired(this.cell as Cell) && this.cell.moveChecker(target))
            return true;

        if (this.logo === checkerWhiteKing
            && !this.cell.board.isRequired(this.cell as Cell)
            && this.cell.isEmptyDiagonal(target)) return true;
        if (this.logo === checkerBlackKing
            && !this.cell.board.isRequired(this.cell as Cell)
            && this.cell.isEmptyDiagonal(target)) return true;

        if (this.logo === checkerWhiteKing && this.cell.isEmptyDiagonalOfRequiredCells(target)) return true;
        return this.logo === checkerBlackKing && this.cell.isEmptyDiagonalOfRequiredCells(target);
    }

    moveCheckerNeed(target: Cell): boolean {
        if(!super.canMove(target)) return false;
        const direction = this.cell.figure?.color === Colors.WHITE ? -1 : 1
        if (this.cell.x - 2 == target.x
            && this.cell.y + 2 * direction == target.y
            && this.cell.board.getCell(target.y, target.x).isEmpty()
            && this.cell.isEnemy(this.cell.board.getCell(this.cell.y + direction, this.cell.x - 1))){
            return true
        }

        if (this.cell.x - 2 == target.x
            && this.cell.y - 2 * direction == target.y
            && this.cell.board.getCell(target.y, target.x).isEmpty()
            && this.cell.isEnemy(this.cell.board.getCell(this.cell.y - direction, this.cell.x - 1))){
            return true
        }

        if (this.cell.x + 2 == target.x
            && this.cell.y + 2 * direction == target.y
            && this.cell.board.getCell(target.y, target.x).isEmpty()
            && this.cell.isEnemy(this.cell.board.getCell(this.cell.y + direction, this.cell.x + 1))){
            return true
        }

        return this.cell.x + 2 == target.x
            && this.cell.y - 2 * direction == target.y
            && this.cell.board.getCell(target.y, target.x).isEmpty()
            && this.cell.isEnemy(this.cell.board.getCell(this.cell.y - direction, this.cell.x + 1));
    }
}