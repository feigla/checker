import React, {FC, useRef} from 'react';
import {Cell} from "../models/Cell";
import {DragPreviewImage, useDrag,} from "react-dnd";
import {Player} from "../models/Players";

interface CheckerComponentProps {
    cell: Cell
    click: (cell: Cell) => void
    currentPlayer: Player | null
}

const CheckerComponent: FC<CheckerComponentProps> = ({cell, click, currentPlayer}) => {
    const ref = useRef<HTMLImageElement>(null)
    const [{isDragging}, drag, preview] = useDrag({
        type: 'checker',
        collect: (monitor) => (
            {
                isDragging: monitor.isDragging(),
            }
        ),
    })

    const moveChecker = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const moveAt: any = (pageX: number, pageY: number) => {
            if (!ref.current) {
                return
            }
            ref.current.style.position = 'absolute'
            ref.current.style.left = pageX - ref.current.offsetWidth / 2 + 'px';
            ref.current.style.top = pageY - ref.current.offsetHeight / 2 + 'px';
        }
        moveAt (event.pageX, event.pageY)
    }

    drag(ref)
    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src={cell.figure?.logo as string}  />
                <img
                ref={ref}
                onDrag={() => click(cell)}
                onDragStart={(event) => moveChecker(event)}
                onDragEnd={() => (ref.current as HTMLImageElement).style.position = 'static'}
                onMouseDown={(event) => moveChecker(event)}
                onMouseUp={() => (ref.current as HTMLImageElement).style.position = 'static'}
                style={{opacity: isDragging ? 0 : 1}}
                src={cell.figure?.logo as string}
                alt=''
                key={cell.figure?.id}/>
        </React.Fragment>
    );
};

export default CheckerComponent;