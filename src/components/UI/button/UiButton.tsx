import React, {FC} from 'react';
import './UiButton.css'

interface UiButtonProps {
    [x: string]: any
    children: React.ReactNode
}

const UiButton: FC<UiButtonProps> = ({ children, ...rest}) => {
    return (
        <button className='ui__button' {...rest}>
            {children}
        </button>
    );
};

export default UiButton;