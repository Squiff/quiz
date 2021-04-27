import styled, { css, StyledComponent } from 'styled-components';

const Card = styled.div`
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    padding: 10px;
`;

const CardHeader = styled.h3`
    font-size: 1.5rem;
    margin: 0;
`;

const CardContent = styled.div`
    padding: 0px;
`;

const CardTop = styled.div`
    display: flex;
    justify-content: Center;
    position: relative;
    margin-bottom: 1rem;
`;

export { Card, CardHeader, CardContent, CardTop };
