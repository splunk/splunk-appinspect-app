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

import React, { useState, useEffect, useRef, useContext } from 'react';
import File from '@splunk/react-ui/File';
import axios from 'axios';
import WaitSpinner from '@splunk/react-ui/WaitSpinner';
import Button from '@splunk/react-ui/Button';
import Heading from '@splunk/react-ui/Heading';
import Message from '@splunk/react-ui/Message';

import { store } from '../state/store';

export default function Inspector() {

    let [requestState, setRequestState] = useState('WAITING_TO_UPLOAD');

    let fileReader = useRef(new FileReader());

    let [filename, setFilename] = useState('');

    let [htmlReport, setHtmlReport] = useState('');

    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const [requestId, setRequestId] = useState('');

    useEffect(() => {
        if (requestState === 'PROCESSING') {
            // Check the status of the request
            async function checkStatus() {
                try {
                    let res = await axios.get(`https://appinspect.splunk.com/v1/app/validate/status/${requestId}`, {
                        headers: {
                            Authorization: `Bearer ${state.token}`
                        }
                    });

                    if (res.data.status === "SUCCESS") {
                        setRequestState('SUCCESS');
                        clearInterval(interval);
                    }

                } catch (e) {
                    console.error('There was an error getting the app status', e.message);
                    setRequestState('FAILED');
                }
            }
            let interval = setInterval(checkStatus, 3000);
        }

        if (requestState === 'SUCCESS') {
            // Get the report
            async function getReport() {
                try {
                    let res = await axios.get(`https://appinspect.splunk.com/v1/app/report/${requestId}`, {
                        headers: {
                            Authorization: `Bearer ${state.token}`,
                            'Content-Type': 'text/html'
                        },
                        data: {}
                    });

                    setHtmlReport(res.data);
                } catch (e) {
                    console.error('There was an error getting the app results', e.message);
                    setRequestState('FAILED');
                }
            }
            getReport();
        }
    }, [requestState])

    async function uploadFile(file) {
        let formData = new FormData();
        formData.append('app_package', file);

        try {
            setRequestState('UPLOADING');
            let res = await axios.post('https://appinspect.splunk.com/v1/app/validate', formData, {
                headers: {
                    Authorization: `Bearer ${state.token}`
                }
            });


            if (res.status === 200) {
                setRequestId(res.data.request_id);
                setRequestState('PROCESSING');
            } else {
                console.error('Bad status', res.status);
            }
        } catch (e) {
            console.error('There was an error uploading the file', e.message);
        }
    }

    function handleAddFiles(files) {
        const file = files[0];
        if (fileReader.current.readyState === 1) {
            fileReader.current.abort();
        }

        fileReader.current.onload = () => {
            setFilename(file.name);
            // Do the upload here
            uploadFile(file)
        }

        fileReader.current.readAsDataURL(file);
    }

    function handleRemoveFile() {
        if (fileReader.current.readyState === 1) {
            fileReader.current.abort();
        }
        setFilename('');
    }

    function render() {
        if (requestState === 'WAITING_TO_UPLOAD') {
            return (
                <div style={{ maxWidth: 100 + '%' }}>
                    <File
                        help="this.handleAddFiles = this.handleAddFiles.bind(this);"
                        size="medium"
                        onRequestAdd={handleAddFiles}
                        onRequestRemove={handleRemoveFile}
                    >
                        {filename && <File.Item name={filename} />}
                    </File>
                </div>
            )
        } else if (requestState === 'PROCESSING' || requestState === 'UPLOADING') {
            return (
                <WaitSpinner size="medium" />
            )
        } else if (requestState === 'SUCCESS') {
            return (
                <div>
                    <Button style={{ marginBottom: 10 + 'px'}} onClick={() => setRequestState('WAITING_TO_UPLOAD')} appearance="primary">Submit another app</Button>
                    <div dangerouslySetInnerHTML={{__html: htmlReport}} />
                </div>
            )
        } else {
            return <Message type="error">There was an error completing the request.</Message>
        }
    }

    return (
        <div>
            <Heading level={1}>FDSE AppInspect</Heading>
            { render() }
        </div>
    )

}