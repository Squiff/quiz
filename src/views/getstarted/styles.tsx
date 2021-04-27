import styled, { keyframes } from 'styled-components';

const animation = keyframes`
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-16px);
	}
	100% {
		transform: translateY(0px);
	}
`;

/* Font family import directly in index.html */
const StyledLogo = styled.h1`
    font-size: 4.5rem;
    margin: 0 0 2rem 0;
    font-weight: 600;
    font-family: 'Big Shoulders Display', cursive;
    text-align: center;
    color: #fff1ba;
    filter: drop-shadow(rgba(255, 209, 26, 0.95) 0px 0px 2px)
        drop-shadow(rgba(255, 218, 71, 0.75) 0px 0px 12px)
        drop-shadow(rgba(255, 218, 71, 0.44) 0px 0px 36px);
    animation: ${animation} 1.75s ease-in-out infinite;
`;

export { StyledLogo };
