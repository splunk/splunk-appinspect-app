import baseEnterprise from '@splunk/themes/enterprise';
import baseLite from '@splunk/themes/lite';

export const variable = name => props => props.theme['splunk-appinspect-app'][name];
export const mixin = name => (...args) => props => props.theme['splunk-appinspect-app'].mixins[name](...args);

export const enterprise = { 'splunk-appinspect-app': baseEnterprise }; // prettier-ignore
export const lite = { 'splunk-appinspect-app': baseLite }; // prettier-ignore
export const themes = { enterprise, lite };
