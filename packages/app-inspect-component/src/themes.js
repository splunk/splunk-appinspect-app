import baseEnterprise from '@splunk/themes/enterprise';
import baseLite from '@splunk/themes/lite';

const getTheme = props =>
    props.theme && props.theme['app-inspect-component'] ? props.theme['app-inspect-component'] : baseEnterprise; // prettier-ignore
export const variable = name => props => getTheme(props)[name];
export const mixin = name => (...args) => props => getTheme(props).mixins[name](...args);

export const enterprise = { 'app-inspect-component': baseEnterprise }; // prettier-ignore
export const lite = { 'app-inspect-component': baseLite }; // prettier-ignore
export const themes = { enterprise, lite };
