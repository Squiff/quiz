import { Transition, TransitionStatus } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';

/*---------- TYPES -----------*/
type ViewTransitionDirection = 'next' | 'prev';

interface StyledViewSlideProps {
    state: TransitionStatus;
    directionX: ViewTransitionDirection;
    animationDuration: number;
    order?: number;
}

/* ------------ Styles ---------------*/

const scaleFactor = 0.95;

const AnimationNextIn = keyframes`
    0% { transform: scale(${scaleFactor}); opacity: 0;}
    25% { transform: scale(${scaleFactor}); opacity: 0;}
    75% {transform: translateX(-100%) scale(${scaleFactor}); opacity: 1}
    100% {transform: translateX(-100%)}
    `;

const AnimationNextOut = keyframes`
    0% {transform: scale(1)};
    25% {transform: scale(${scaleFactor}); opacity: 1};
    75% {transform: translateX(-100%) scale(${scaleFactor}); opacity: 0}
    100% {transform: translateX(-100%) scale(${scaleFactor}); opacity: 0}
    `;

const StyledViewSlider = styled.div`
    overflow-x: hidden;
    display: flex;
    align-items: flex-start;
`;

const StyledViewSlide = styled.div<StyledViewSlideProps>`
    display: none;
    min-height: 100vh;
    align-items: center;
    flex: 0 0 100%;
    order: ${(p) => p.order};

    & > * {
        flex: 0 0 100%;
    }

    /* display: flex; */

    ${(p) => {
        switch (p.state) {
            case 'exiting':
                return css`
                    display: flex;
                    animation: ${p.directionX === 'next' ? AnimationNextOut : AnimationNextIn};
                    animation-direction: ${p.directionX === 'next' ? 'forwards' : 'reverse'};
                    animation-duration: ${p.animationDuration}ms;
                    animation-timing-function: 'ease';
                    animation-fill-mode: both;
                `;
            case 'entering':
                return css`
                    display: flex;
                    animation: ${p.directionX === 'next' ? AnimationNextIn : AnimationNextOut};
                    animation-duration: ${p.animationDuration}ms;
                    animation-direction: ${p.directionX === 'next' ? 'forwards' : 'reverse'};
                    animation-timing-function: 'ease';
                    animation-fill-mode: both;
                `;
            case 'entered':
                return css`
                    display: flex;
                `;
            default:
                break;
        }
    }}
`;

export { StyledViewSlider, StyledViewSlide };
