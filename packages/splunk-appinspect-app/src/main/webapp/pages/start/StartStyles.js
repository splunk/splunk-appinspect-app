import styled from 'styled-components';
import { variable, mixin } from './themes';

const StyledContainer = styled.div`
    ${mixin('reset')('inline')};
    display: block;
    font-size: ${variable('fontSizeLarge')};
    line-height: 200%;
    margin: calc(${variable('spacing')} * 2) calc(${variable('spacing')} * 2);
`;

const StyledGreeting = styled.div`
    font-weight: bold;
    color: ${variable('infoColor')};
    font-size: ${variable('fontSizeXXLarge')};
`;

export { StyledContainer, StyledGreeting };
