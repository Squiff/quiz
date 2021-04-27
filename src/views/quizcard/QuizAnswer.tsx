import { useContext } from 'react';
import {
    QuizAnswers as StyledQuizAnswers,
    QuizAnswer as StyledQuizAnswer,
    QuizAnswerStatus,
} from './styles';
import {
    QuizContextDispatcher,
    QuizContextConsumer,
    QuizStage,
    ReducerActionType,
} from '../../context/QuizContext';
import { decode } from 'he';

interface Props {
    answer: string;
}

export default function QuizAnswers({ answer }: Props) {
    const { quizStage, selectedAnswer, questions, currentQuestion } = useContext(
        QuizContextConsumer
    );
    const dispatch = useContext(QuizContextDispatcher);

    let status: QuizAnswerStatus | undefined;
    const correctAnswer = questions[currentQuestion].correct_answer;

    if (quizStage === QuizStage.selectAnswer) {
        status = answer === selectedAnswer ? QuizAnswerStatus.Active : undefined;
    } else if (answer === correctAnswer) {
        status = QuizAnswerStatus.Correct;
    } else if (answer === selectedAnswer) {
        status = QuizAnswerStatus.Incorrect;
    }

    return (
        <StyledQuizAnswer
            status={status}
            onClick={() => {
                dispatch({ type: ReducerActionType.SelectAnswer, payload: answer });
            }}
        >
            {decode(answer)}
        </StyledQuizAnswer>
    );
}
