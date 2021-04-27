import styled, { css } from 'styled-components';

const QuizQuestion = styled.div`
    background: #ffffff;
    color: ${(p) => p.theme.colors.darkText};
    border-radius: 0.25rem;
    padding: 20px;
    font-size: 1.25rem;
    margin-top: 10px;
    font-weight: 600;
`;

const QuizAnswers = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
`;

enum QuizAnswerStatus {
    Active,
    Correct,
    Incorrect,
}

interface QuizAnswerProps {
    status?: QuizAnswerStatus;
}

const attrsFactory = (props: QuizAnswerProps) => ({
    'aria-pressed': props.status === QuizAnswerStatus.Active,
});

const QuizAnswer = styled.button.attrs(attrsFactory)<QuizAnswerProps>`
    padding: 10px 15px;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1.125rem;
    border: none;
    cursor: pointer;

    &:focus:not(:focus-visible) {
        outline: none;
    }

    ${(p) => {
        switch (p.status) {
            case QuizAnswerStatus.Active:
                return css`
                    background-color: ${p.theme.colors.activeBackground};
                    color: ${p.theme.colors.active};
                `;
            case QuizAnswerStatus.Correct:
                return css`
                    background-color: ${p.theme.colors.successBackground};
                    color: ${p.theme.colors.success};
                `;
            case QuizAnswerStatus.Incorrect:
                return css`
                    background-color: ${p.theme.colors.dangerBackground};
                    color: ${p.theme.colors.danger};
                `;
            default:
                return css`
                    background-color: #ffffff;
                    color: ${p.theme.colors.darkText};
                `;
        }
    }}
`;

let QuizSummary = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    font-weight: 600;
`;

export { QuizQuestion, QuizAnswers, QuizAnswer, QuizSummary, QuizAnswerStatus };
