import React, {FC} from 'react';
import './UiModal.css'
import {observer} from "mobx-react-lite";
import modal from './../../../store/modal'

interface UiModalProps {
    children: React.ReactNode | null
}

const UiModal: FC<UiModalProps> = observer(({children}) => {
    return (
        <div className={['modal ', modal.isModal ? 'active ' : ''].join(' ')}>
            <div className={['modal__content ', modal.isModal ? 'active ' : ''].join(' ')}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
});

export default UiModal;