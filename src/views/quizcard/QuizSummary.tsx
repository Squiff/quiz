import { QuizSummary as StyledQuizSummary } from './styles';

interface Props {
    currentQuestion: number;
    questionCount: number;
    correctCount: number;
    answeredCount: number;
}

function QuizSummary({ currentQuestion, questionCount, correctCount, answeredCount }: Props) {
    return (
        <StyledQuizSummary>
            <div>
                Question {currentQuestion} of {questionCount}
            </div>
            {answeredCount > 0 && (
                <div>
                    Score {correctCount}/{answeredCount}
                </div>
            )}
        </StyledQuizSummary>
    );
}

export default QuizSummary;
