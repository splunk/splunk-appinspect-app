import React from 'react';
import { ThemeProvider } from 'styled-components';

import layout from '@splunk/react-page';
import { themes as reactUiThemes } from '@splunk/react-ui/themes';
import { defaultTheme } from '@splunk/splunk-utils/themes';

import AppInspectComponent from '@splunk/app-inspect-component';
import { themes as componentThemes } from '@splunk/app-inspect-component/themes';
import { StyledContainer, StyledGreeting } from './StartStyles';
import { themes as appThemes } from './themes';

const themeName = defaultTheme();
const theme = {
    ...appThemes[themeName],
    ...componentThemes[themeName],
    ...reactUiThemes[themeName],
};
layout(
    <ThemeProvider theme={theme}>
        <StyledContainer>
            <StyledGreeting>Hello, from inside SplunkAppinspectApp!</StyledGreeting>
            <div>Your component will appear below.</div>
            <AppInspectComponent name="from inside AppInspectComponent" />
        </StyledContainer>
    </ThemeProvider>
);
