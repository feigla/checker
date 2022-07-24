import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Game from "../pages/Game";

const AppRoutes = observer(() => {

    return (
        <Routes>
            <Route path='/:id' element={<Game/>}/>
            <Route
                path='*'
                element={<Navigate to={`f${(+new Date).toString(16)}`} replace />}
            />
        </Routes>
    );
})

export default AppRoutes;