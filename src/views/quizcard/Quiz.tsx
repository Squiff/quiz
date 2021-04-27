import { QuizQuestion } from './styles';
import QuizSummary from './QuizSummary';
import QuizAnswers from './QuizAnswers';
import {
    QuizContextDispatcher,
    QuizContextConsumer,
    ReducerActionType,
    QuizStage,
} from '../../context/QuizContext';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import React, { useContext } from 'react';
import Button from '../../components/button';
import Wrapper from '../../components/wrapper';
import { decode } from 'he';

function Quiz() {
    const { currentQuestion, questions, correctCount, answeredCount, quizStage } = useContext(
        QuizContextConsumer
    );

    const dispatch = useContext(QuizContextDispatcher);
    const sliderDispatch = useContext(ViewSliderDispatcher);
    const currentQuestionObj = questions[currentQuestion];

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (quizStage === QuizStage.selectAnswer) {
            dispatch({ type: ReducerActionType.SubmitAnswer });
        } else if (quizStage === QuizStage.quizComplete) {
            sliderDispatch({ type: dispatchAction.Next });
        } else {
            dispatch({ type: ReducerActionType.NextQuestion });
        }
    }

    if (questions.length === 0) {
        return null;
    }

    return (
        <>
            <QuizSummary
                currentQuestion={currentQuestion + 1}
                questionCount={questions.length}
                correctCount={correctCount}
                answeredCount={answeredCount}
            />
            <QuizQuestion>{decode(currentQuestionObj.question)}</QuizQuestion>
            <QuizAnswers answers={currentQuestionObj.answers} />
            <Wrapper marginTop="0.75rem">
                <Button onClick={handleClick} block>
                    {getButtonText(quizStage)}
                </Button>
            </Wrapper>
        </>
    );
}

function getButtonText(quizStage: QuizStage) {
    switch (quizStage) {
        case QuizStage.selectAnswer:
            return 'Submit Answer';
        case QuizStage.reviewAnswer:
            return 'Next Question';
        case QuizStage.quizComplete:
            return 'Quiz Complete';
        default:
            return 'Submit Answer';
    }
}

export default Quiz;
