import styled from 'styled-components';

interface InputProps {
    invalid?: boolean;
}

const Input = styled.input<InputProps>`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;
    outline-width: 1px;
    font-size: 1rem;
    margin-bottom: 0.5rem;

    display: block;
    width: 100%;

    border-color: ${(props) => {
        if (props.invalid) return 'red';
    }};
`;

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0.5rem;
`;

const FormGroup = styled.div`
    margin-bottom: 0.75rem;
`;

const StyledFormValidationText = styled.div`
    color: red;
    font-size: 0.875rem;
    font-weight: 500;
`;

function FormValidationText({ msg }: { msg?: string }) {
    if (!msg) return null;

    return <StyledFormValidationText>{msg}</StyledFormValidationText>;
}

export { Input, Label, FormGroup, FormValidationText };
