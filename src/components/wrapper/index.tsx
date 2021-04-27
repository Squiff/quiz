import styled from 'styled-components';

interface Props {
    margin?: string;
    marginTop?: string;
    marginRight?: string;
    marginLeft?: string;
    marginBottom?: string;
}

const Wrapper = styled.div<Props>`
    margin: ${(p) => p.margin};
    margin-top: ${(p) => p.marginTop};
    margin-right: ${(p) => p.marginRight};
    margin-left: ${(p) => p.marginLeft};
    margin-bottom: ${(p) => p.marginBottom}; ;
`;

export default Wrapper;
