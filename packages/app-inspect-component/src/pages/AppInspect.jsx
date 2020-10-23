/*
Copyright 2020 Splunk Inc. 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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