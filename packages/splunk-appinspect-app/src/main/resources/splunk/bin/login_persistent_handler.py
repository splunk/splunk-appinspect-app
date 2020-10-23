#   ########################################################################
#   Copyright 2020 Splunk Inc.
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.
#   ########################################################################


# standard packages
import os
import sys
import json
import logging
import uuid
import requests
import base64
# splunk.persistconn.packet.PersistentServerConnectionProtocolException

libpath = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [libpath]

# from eai_handler import EAI

# splunkd packages
from splunk.persistconn.application import PersistentServerConnectionApplication
from splunk import rest

logfile = os.sep.join([os.environ['SPLUNK_HOME'], 'var', 'log', 'splunk', 'login_persistent_handler.log'])
logging.basicConfig(filename=logfile,level=logging.DEBUG)

# constants
_APP_NAME = 'appinspect'
_CREATE_EXPECTED_ARGS = {'username', 'password'}

# errors
_ERROR = 'error'


class LoginPersistentHandler(PersistentServerConnectionApplication):
    def __init__(self, command_line, command_arg):
        PersistentServerConnectionApplication.__init__(self)
        # EAI Handler
        self.rest_eai = None

    def flatten_query_params(self, params):
        flattened = {}
        for i, j in params:
            flattened[i] = flattened.get(i) or j
        x = {k.encode('ascii'): v.encode('ascii') for k, v in flattened.items()}
        return x

    def handle(self, in_string):

        request = json.loads(in_string)
        session_key = request['session']['authtoken']
        request_type = request['method']
        rest_path = request['rest_path'].split('/')
        query_params = self.flatten_query_params(request['query'])
        form_params = self.flatten_query_params(request['form'])
        post_params = []
        has_stanza = False
        stanza_name = None
        response = {}

        if len(rest_path) > 2:
            stanza_name = rest_path[2]
            has_stanza = True

        response = self.handle_list(query_params, form_params, session_key)

        if _ERROR in response:
            payload = json.dumps({
                'result': response,
                'request': request
            })
            return json.dumps({
                'payload': payload,  # json.dumps(response)
                'status': 500
            })

        # Build return payload
        logging.debug('Building payload 5')
        payload = json.dumps({
            'result': response,
            'request': request
        })

        return json.dumps({
            'payload': payload,
            'status': 200
        })

    def handle_list(self, query_params, form_params, session_key):
        logging.debug('handle list requested')
        try:
            auth = (form_params['username'], form_params['password'])
            resp = requests.get('https://api.splunk.com/2.0/rest/login/splunk',
                                auth=auth, verify=True)
            if resp.status_code != 200:
                return {'error': resp.status_code, 'messsage': resp.text}
            else:
                try:
                    data = resp.json()
                    response_payload = data['data']
                    return response_payload
                except Exception as e:
                    logging.debug(e)
                    pass
        except Exception as e:
            return {'error': str(e)}
