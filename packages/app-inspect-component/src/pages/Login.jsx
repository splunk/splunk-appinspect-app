import React, { useState, useContext } from 'react';
import { store } from '../state/store';

import Heading from '@splunk/react-ui/Heading';
import P from '@splunk/react-ui/Paragraph';
import ControlGroup from '@splunk/react-ui/ControlGroup';
import Text from '@splunk/react-ui/Text';
import Button from '@splunk/react-ui/Button';
import Message from '@splunk/react-ui/Message';

import axios from 'axios';

export default function Login() {
    const globalState = useContext(store);
    const { dispatch } = globalState;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [hasLoginError, setHasLoginError] = useState(false);

    async function handleLogin() {
        setIsLoggingIn(true);
        
        try {
            const URL = 'https://api.splunk.com/2.0/rest/login/splunk';
            let payload = `http://www`
            let res = await axios.post('https://a9qx6015t1.execute-api.us-east-2.amazonaws.com/dev/login', {
                username: username,
                password: password
            });
            
            let data = res.data.data;

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