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

import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Text from '@splunk/react-ui/Text';
import Button from '@splunk/react-ui/Button';
import Message from '@splunk/react-ui/Message';
import querystring from 'querystring';
import axios from 'axios';

export default function Login() {
    const globalState = useContext(store);
    const { dispatch } = globalState;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [hasLoginError, setHasLoginError] = useState(false);

    function getCookieValue(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    // import { createRESTURL, createURL } from '@splunk/splunk-utils/url';
    /*
        fetchCreate(endpoint, params) {
        return fetch(createRESTURL(endpoint, { 'app': app, owner: 'nobody' }, {}), {
            ...defaultFetchInit,
            method: 'POST',
            body: querystring.encode({
                output_mode: 'json',
                ...params,
            }),
        });
    };
    */

    async function handleLogin() {
        setIsLoggingIn(true);

        try {
            const URL = 'https://api.splunk.com/2.0/rest/login/splunk';
            let payload = `http://www`
            const req = {
                method: "post",
                url: '/en-US/splunkd/__raw/services/splunklogin',
                headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',                // does not work -- raw / form-data
                        'X-Splunk-Form-Key' : getCookieValue('splunkweb_csrf_token_8000'),
                        'X-Requested-With': 'XMLHttpRequest'},
                data: querystring.encode({
                    'username': username,
                    'password': password })

            };

            let res = await axios(req);
            console.log(res);
            let data = res.data.result;  // res.data.data;

            dispatch({
                type: 'UPDATE-TOKEN',
                payload: {
                    token: data.token
                }
            });
        } catch (e) {
            console.error('There was an error making the request', e.message);
            setHasLoginError(true);
        } finally {
            setIsLoggingIn(false);
        }
    }

    function handleUsernameUpdate(e) {
        setUsername(e.target.value);
    }

    function handlePasswordUpdate(e) {
        setPassword(e.target.value);
    }

    function renderError() {
        if (hasLoginError) {
            return <Message type="error">There was an error logging in.</Message>;
        }
    }

    return (
        <div className="login">
            <Heading level={1}>Login to FDSE AppInspect</Heading>
            <P>Use your Splunkbase credentials</P>
            { renderError() }
            <ControlGroup label="Username" labelPosition="top">
                <Text onChange={handleUsernameUpdate} value={username} />
            </ControlGroup>
            <ControlGroup label="Password" labelPosition="top">
                <Text type="password" onChange={handlePasswordUpdate} value={password} />
            </ControlGroup>
            <Button disabled={isLoggingIn} onClick={handleLogin} appearance="primary">Login</Button>
        </div>
    )

}
