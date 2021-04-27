import styled, { keyframes } from 'styled-components';

const StyledProgress = styled.div`
    height: 8px;
    background-color: ${(p) => p.theme.colors.primary};
    position: relative;
    overflow: hidden;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        height: 100%;
        width: 100%;
        display: block;
        background-color: #ffffff;
        opacity: 0.5;
    }
`;

const indeterminateAnimation = keyframes`
    0% { transform: translateX(-100%);}
    100% {transform: translateX(200%);}
`;

const ProgressBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: inherit;
    transition: width 150ms linear;

    width: 50%;
    animation: ${indeterminateAnimation} 1.75s cubic-bezier(0.37, 0, 0.63, 1) infinite;
`;

export default function Progress() {
    return (
        <StyledProgress>
            <ProgressBar />
        </StyledProgress>
    );
}
