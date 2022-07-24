import React, {FC, useRef} from 'react';
import {Cell} from "../models/Cell";
import {DragPreviewImage, useDrag,} from "react-dnd";
import sessions from "../store/sessions";

interface CheckerComponentProps {
    cell: Cell
    click: (cell: Cell) => void
}

const CheckerComponent: FC<CheckerComponentProps> = ({cell, click}) => {
    const ref = useRef<HTMLImageElement>(null)
    const [{isDragging}, drag, preview] = useDrag({
        type: 'checker',
        collect: (monitor) => (
            {
                isDragging: monitor.isDragging(),
            }
        ),
    })
    drag(ref)
    return (
        <React.Fragment>
            <DragPreviewImage connect={preview} src={cell.figure?.logo as string}  />
                <img
                ref={ref}
                className='checker'
                onDrag={() => click(cell)}
                style={{opacity: isDragging ? 0 : 1, transform: sessions.isSideBlack ? 'rotate(180deg)' : ''}}
                src={cell.figure?.logo as string}
                alt=''
                key={cell.figure?.id}/>
        </React.Fragment>
    );
};

export default CheckerComponent;