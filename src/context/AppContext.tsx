import { QuizContextProvider } from './QuizContext';
import ThemeContextProvider from './ThemeContext';

function AppContextProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContextProvider>
            <QuizContextProvider>{children}</QuizContextProvider>
        </ThemeContextProvider>
    );
}

export default AppContextProvider;
