import { useContext } from 'react';
import Button from '../../components/button';
import { Card, CardContent } from '../../components/card';
import Flex from '../../components/flex';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import Wrapper from '../../components/wrapper';

import {
    QuizContextDispatcher,
    QuizContextConsumer,
    ReducerActionType,
    QuizStage,
} from '../../context/QuizContext';
import { Score, ScoreText } from './styles';

function QuizRecap() {
    const { questions, correctCount } = useContext(QuizContextConsumer);
    const dispatch = useContext(ViewSliderDispatcher);

    // go to category select
    const handleClick = () => dispatch({ type: dispatchAction.Next, payload: 2 });

    return (
        <>
            <Flex justifyContent="center" alignItems="center">
                <div>
                    <Card>
                        <CardContent>
                            <ScoreText>You Scored</ScoreText>

                            <Score>
                                {correctCount}/{questions.length}
                            </Score>
                        </CardContent>
                    </Card>
                    <Wrapper marginTop="0.75rem">
                        <Button block variant="glass" onClick={handleClick}>
                            Try Again
                        </Button>
                    </Wrapper>
                </div>
            </Flex>
        </>
    );
}

export { QuizRecap };
