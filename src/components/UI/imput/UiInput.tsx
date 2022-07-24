import React, {FC} from 'react';
import './UiInput.css'

interface UiInputProps {
    [x: string]: any
}

const UiInput: FC<UiInputProps> = (rest) => {
    return (
        <input {...rest} className='ui__input'/>
    );
};

export default UiInput;