import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { themes as reactUiThemes } from '@splunk/react-ui/themes';
import { defaultTheme } from '@splunk/splunk-utils/themes';

import AppInspectComponent from '../src/AppInspectComponent';
import { themes as componentThemes } from '../src/themes';

const themeName = defaultTheme();
const theme = { ...componentThemes[themeName], ...reactUiThemes[themeName] };
const containerEl = document.getElementById('main-component-container');
render(
    <ThemeProvider theme={theme}>
        <AppInspectComponent name="World" />
    </ThemeProvider>,
    containerEl
);
