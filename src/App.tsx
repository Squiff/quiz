import Main from './views/main';
import AppContextProvider from './context/AppContext';

function App() {
    return (
        <>
            <AppContextProvider>
                <div className="background-img"></div>
                <Main />
            </AppContextProvider>
        </>
    );
}

export default App;
