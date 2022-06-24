import {Cell} from "../Cell";
import {Colors} from "../Colors";
import checkerBlack from '../../assets/checker-black/img.png'
import checkerWhiteKing from '../../assets/checker-white-king/img.png'
import checkerBlackKing from '../../assets/checker-black-king/img.png'

export class Figure {
    logo: typeof checkerBlack | null
    cell: Cell
    color: Colors
    id: number


    constructor(cell: Cell, color: Colors) {
        this.cell = cell;
        this.color = color;
        this.id = Math.random()
        this.logo = null
        this.cell.figure = this
    }

    public canMove(target: Cell): boolean {
        if (target.figure?.color) {
            return false
        }
        return true
    }

    public moveFigureNeed(target: Cell) {
        if (this.moveCheckerNeed(target)) {
            const directionY = target.y < this.cell.y ? 1 : -1
            if (this.cell.x > target.x) {
                this.cell.board.getCell(target.y + directionY, target.x + 1).figure = null
            } else {
                this.cell.board.getCell(target.y + directionY, target.x - 1).figure = null
            }
        }
        if (this.logo === checkerWhiteKing || this.logo === checkerBlackKing) {
            const [dy, dx, absY] = this.cell.getDiagonalVal(target)

            for (let i = 1; i < absY; i++) {
                if (this.cell.isEnemy(this.cell.board.getCell(this.cell.y + dy * i, this.cell.x + dx * i))) {
                    this.cell.board.getCell(this.cell.y + dy * i, this.cell.x + dx * i).figure = null
                }
            }
        }
    }

    public moveCheckerNeed(target: Cell): boolean {
        return true
    }
}