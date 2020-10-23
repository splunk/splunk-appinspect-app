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

import styled from 'styled-components';
import { variable, mixin } from './themes';
import "core-js/stable";
import "regenerator-runtime/runtime";

const StyledContainer = styled.div`
    ${mixin('reset')('inline-block')};
    font-size: ${variable('fontSizeLarge')};
    line-height: 200%;
    margin: ${variable('spacing')} ${variable('spacingHalf')};
    padding: ${variable('spacing')} calc(${variable('spacing')} * 2);
    border-radius: ${variable('borderRadius')};
    box-shadow: ${variable('overlayShadow')};
    background-color: ${variable('backgroundColor')};
`;

const StyledGreeting = styled.div`
    font-weight: bold;
    color: ${variable('brandColor')};
    font-size: ${variable('fontSizeXXLarge')};
`;

export { StyledContainer, StyledGreeting };
