import styled from 'styled-components';

interface Props {
    justifyContent?: string;
    alignItems?: string;
}

const Flex = styled.div<Props>`
    display: flex;
    justify-content: ${(p) => p.justifyContent};
    align-items: ${(p) => p.alignItems};
`;

export default Flex;
