import React, {ChangeEvent} from 'react';
import UiInput from "./UI/imput/UiInput";
import UiButton from "./UI/button/UiButton";
import {observer} from "mobx-react-lite";
import sessions from "../store/sessions";
import {ISession} from "../types/ISession";
import modal from "../store/modal";
import {useParams} from "react-router-dom";

const SessionForm = observer(() => {
    const params = useParams()
    const createSession = () => {
        const sessionId = params.id as string
        const password = sessions.password
        const session: ISession = {
            password,
            sessionId,
        }
        modal.setModal(false)
        sessions.setSession(session)
    }

    return (
        <div className='session__form'>
            <UiInput
                value={sessions.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => sessions.setPassword(e.target.value)}
                placeholder='password...'
                maxLength={15}
            />
            <UiButton onClick={createSession}>Войти</UiButton>
        </div>
    );
});

export default SessionForm;