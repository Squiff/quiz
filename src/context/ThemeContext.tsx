import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
    colors: {
        darkText: '#222222',
        primary: '#1c0c3b',
        primaryLight: '#301466',
        primaryDark: '#100722',
        active: '#3763E6',
        activeBackground: '#EDF1FD',
        success: '#28721D',
        successBackground: '#E2F7DE',
        danger: '#931621',
        dangerBackground: '#FADCDE',
    },
};

interface Props {
    children: React.ReactNode;
}

function ThemeContextProvider({ children }: Props) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeContextProvider;
