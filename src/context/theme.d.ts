import 'styled-components';

// extend styled components theme interface
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            darkText: string;
            primary: string;
            primaryLight: string;
            primaryDark: string;
            active: string;
            activeBackground: string;
            success: string;
            successBackground: string;
            danger: string;
            dangerBackground: string;
        };
    }
}
