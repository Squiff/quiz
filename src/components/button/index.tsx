import styled, { css, keyframes } from 'styled-components';

interface Props {
    variant?: 'glass';
    isLoading?: boolean;
    block?: boolean;
}

const Button = styled.button<Props>`
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    background: ${(p) => p.theme.colors.primary};
    color: white;
    text-align: center;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    border: none;

    &:hover {
        opacity: 0.9;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }

    ${(p) => {
        if (p.block) {
            return css`
                display: block;
                width: 100%;
            `;
        }
    }}

    ${(p) => {
        if (p.variant === 'glass') {
            return css`
                background: rgba(255, 255, 255, 0.2);

                &:hover {
                    background-color: rgba(255, 255, 255, 0.25);
                }
            `;
        }
    }}

    ${(p) => {
        if (p.isLoading) {
            return css`
                position: relative;
                overflow: hidden;

                &::after {
                    content: '';
                    display: block;
                    width: 50%;
                    height: 100%;
                    background-color: rgba(255, 255, 255, 0.1);
                    animation: ${loadingProgress} 1s infinite cubic-bezier(0.37, 0, 0.63, 1);
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            `;
        }
    }}
`;

const loadingProgress = keyframes`
    from {transform: translateX(-100%)}
    to {transform: translateX(200%);}
`;

export default Button;
