import styled from 'styled-components';
import { variable, mixin } from './themes';

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
