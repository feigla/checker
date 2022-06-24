import React from 'react';
import {Cell} from "../models/Cell";
import {Colors} from "../models/Colors";
import CheckerComponent from './СheckerComponent'
import {useDrop} from "react-dnd";
import {Player} from "../models/Players";

interface CellComponentProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
    currentPlayer: Player | null
}

const CellBlackComponent: React.FC<CellComponentProps> = ({cell, selected, click, currentPlayer}) => {
    const [{isOver, canDrop}, drop] = useDrop({
        accept: 'checker',
        canDrop: () => cell.opened,
        drop: () => click(cell) ,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    return (
        <div
            className={
                ['cell',
                    Colors.BLACK,
                    selected ? "selected" : "",
                    cell.opened && !cell.figure ? "hovering" : "",
                    isOver && canDrop ? "hoveringDrop" : ""
                ].join(' ')}
            onClick={() => click(cell)}
            onDrop={() => click(cell)}
            ref={drop}
        >
            {cell.opened && !cell.figure && <div key={cell.id} className='opened'/>}
            {cell.figure?.logo && <CheckerComponent currentPlayer={currentPlayer} cell={cell} click={click}/>}
        </div>
    );
}

export default CellBlackComponent