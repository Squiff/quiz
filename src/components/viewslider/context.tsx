import { createContext, useReducer } from 'react';

/*---------- TYPES ------------ */
type ViewTransitionDirection = 'next' | 'prev';

interface IViewSliderContext {
    activeId: number;
    direction: ViewTransitionDirection;
    total: number;
    running: boolean;
}

type reducerAction =
    | { type: dispatchAction.SetTotal; payload: number }
    | { type: dispatchAction.Next; payload?: number }
    | { type: dispatchAction.Prev }
    | { type: dispatchAction.Running }
    | { type: dispatchAction.RunningComplete };

enum dispatchAction {
    SetTotal,
    Next,
    Prev,
    Running,
    RunningComplete,
}

/*---------- REDUCER ------------ */
const initialState: IViewSliderContext = {
    activeId: 1,
    direction: 'next',
    total: 0, // could cause issues? div0
    running: false,
};

function reducer(state: IViewSliderContext, action: reducerAction) {
    switch (action.type) {
        case dispatchAction.SetTotal:
            return { ...state, total: action.payload };
        case dispatchAction.Next:
            return next(state, action.payload);
        case dispatchAction.Prev:
            return prev(state);
        case dispatchAction.Running:
            return { ...state, running: true };
        case dispatchAction.RunningComplete:
            return { ...state, running: false };
        default:
            return state;
    }
}

function next(state: IViewSliderContext, nextId?: number): IViewSliderContext {
    const { running, activeId, total } = state;

    if (running) return state;

    const nextSlideId = nextId ? nextId : (activeId % total) + 1;

    const output: Partial<IViewSliderContext> = {
        activeId: nextSlideId,
        direction: 'next',
    };

    return { ...state, ...output };
}

function prev(state: IViewSliderContext): IViewSliderContext {
    const { running, activeId, total } = state;

    if (running) return state;

    const output: Partial<IViewSliderContext> = {
        activeId: activeId === 1 ? total : activeId - 1,
        direction: 'prev',
    };

    return { ...state, ...output };
}

/* ------------- CONTEXT --------- */
const ViewSliderContext = createContext<IViewSliderContext>(undefined as any);
const ViewSliderDispatcher = createContext<React.Dispatch<reducerAction>>(undefined as any);

function ViewSliderContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ViewSliderContext.Provider value={state}>
            <ViewSliderDispatcher.Provider value={dispatch}>
                {children}
            </ViewSliderDispatcher.Provider>
        </ViewSliderContext.Provider>
    );
}

export { ViewSliderContextProvider, ViewSliderContext, ViewSliderDispatcher, dispatchAction };
