import styled from 'styled-components';

const ScoreText = styled.div`
    font-size: 1.25rem;
    text-align: center;
`;

const Score = styled.div`
    font-size: 3rem;
    text-align: center;
`;

const QuizRecap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Attibution = styled.div`
    position: fixed;
    bottom: 0;
    right: 0.5rem;

    & > a {
        color: white;
        font-size: 0.75rem;
        text-decoration: none;
    }
`;

export { ScoreText, Score, QuizRecap, Attibution };
