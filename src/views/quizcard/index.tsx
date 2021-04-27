import { useContext } from 'react';
import { QuizContextConsumer, QuizStage } from '../../context/QuizContext';
import Quiz from './Quiz';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import { Card, CardContent } from '../../components/card';
import Flex from '../../components/flex';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';

function QuizCard() {
    const dispatch = useContext(ViewSliderDispatcher);
    const { quizStage } = useContext(QuizContextConsumer);

    const prev = () => {
        dispatch({ type: dispatchAction.Prev });
    };

    return (
        <>
            <Flex justifyContent="space-between">
                <Button variant="glass" onClick={prev}>
                    Back
                </Button>
            </Flex>
            <Wrapper marginTop="0.75rem">
                <Card>
                    <CardContent>
                        <Quiz />
                    </CardContent>
                </Card>
            </Wrapper>
        </>
    );
}

export default QuizCard;
