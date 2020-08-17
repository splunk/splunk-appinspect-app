import React, { useState, useContext } from 'react';
import { store } from '../state/store';

import Login from './Login';
import Inspector from './Inspector';

export default function AppInspect() {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isLoggedIn = state.token !== undefined && state.token !== '';

    function renderMainElement() {
        if (!isLoggedIn) {
            return <Login />
        } else {
            return <Inspector />
        }
    }

    return (
        <div className="container">
            { renderMainElement() }
        </div>
    )

}