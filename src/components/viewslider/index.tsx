import React, { useContext, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import {
    ViewSliderContextProvider,
    ViewSliderContext,
    ViewSliderDispatcher,
    dispatchAction,
} from './context';

import { StyledViewSlide, StyledViewSlider } from './styles';

/*----------TYPES -----------*/
interface ViewSlideTransitionProps {
    id: number;
    children: React.ReactNode;
}

interface ViewTransitionProps {
    children: React.ReactNode;
}

/*--------COMPONENTS -------*/
function ViewSlideTransition({ id, children }: ViewSlideTransitionProps) {
    const sliderState = useContext(ViewSliderContext);
    const dispatch = useContext(ViewSliderDispatcher);

    const animationDuration = 750;

    const isActive = id === sliderState.activeId;

    // ensures next slide is always coming from the correct direction
    const positionRight =
        (sliderState.direction === 'next' && isActive) ||
        (sliderState.direction === 'prev' && !isActive);

    const order = positionRight ? 1 : 0;

    return (
        <Transition
            in={isActive}
            timeout={animationDuration}
            onEntering={() => dispatch({ type: dispatchAction.Running })}
            onEntered={() => dispatch({ type: dispatchAction.RunningComplete })}
        >
            {(state) => {
                return (
                    <StyledViewSlide
                        state={state}
                        directionX={sliderState.direction}
                        animationDuration={animationDuration}
                        order={order}
                    >
                        {children}
                    </StyledViewSlide>
                );
            }}
        </Transition>
    );
}

function ViewSliderWrapped({ children }: ViewTransitionProps) {
    const dispatch = useContext(ViewSliderDispatcher);
    const childArray = React.Children.toArray(children);
    const total = childArray.length;

    useEffect(() => {
        dispatch({ type: dispatchAction.SetTotal, payload: total });
    }, [total]);

    // wrap each child
    const wrappedChildren = childArray.map((c, i) => (
        <ViewSlideTransition key={i + 1} id={i + 1}>
            {c}
        </ViewSlideTransition>
    ));

    return <StyledViewSlider>{wrappedChildren}</StyledViewSlider>;
}

/*-------- EXPORTED COMPONENTS -------*/
function ViewSlide({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export default function ViewSlider({ children }: ViewTransitionProps) {
    return (
        <ViewSliderContextProvider>
            <ViewSliderWrapped>{children}</ViewSliderWrapped>
        </ViewSliderContextProvider>
    );
}

export { ViewSlider, ViewSlide, ViewSliderDispatcher, ViewSliderContext, dispatchAction };
