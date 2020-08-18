import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@splunk/react-ui/Button';
import { StyledContainer, StyledGreeting } from './AppInspectComponentStyles';
import { StateProvider } from './state/store'
import AppInspect from './pages/AppInspect';

class AppInspectComponent extends Component {
    static propTypes = {
        name: PropTypes.string,
    };

    static defaultProps = {
        name: 'User',
    };

    constructor(props) {
        super(props);
        this.state = { counter: 0 };
    }

    render() {
        const { name } = this.props;
        const { counter } = this.state;

        const message =
            counter === 0
                ? 'You should try clicking the button.'
                : `You've clicked the button ${counter} time${counter > 1 ? 's' : ''}.`;

        return (
            <div>
                <StateProvider>
                    <AppInspect />
                </StateProvider>
            </div>
        );
    }
}

export default AppInspectComponent;
