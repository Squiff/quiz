import OptionsForm from './OptionsForm';
import { Card, CardHeader, CardContent, CardTop } from '../../components/card';
import Wrapper from '../../components/wrapper';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import { useContext } from 'react';
import { QuizContextConsumer, QuizStage } from '../../context/QuizContext';
import Flex from '../../components/flex';
import Button from '../../components/button';

function OptionsCard() {
    const { questions, quizStage } = useContext(QuizContextConsumer);
    const dispatch = useContext(ViewSliderDispatcher);

    const canResumeQuiz = questions.length > 0 && quizStage !== QuizStage.quizComplete;

    return (
        <>
            <Flex justifyContent="space-between">
                <Button
                    onClick={() => {
                        dispatch({ type: dispatchAction.Prev });
                    }}
                    variant="glass"
                >
                    Back
                </Button>
                {canResumeQuiz && (
                    <Button
                        onClick={() => {
                            dispatch({ type: dispatchAction.Next });
                        }}
                        variant="glass"
                    >
                        Resume
                    </Button>
                )}
            </Flex>
            <Wrapper marginTop="0.75rem">
                <Card>
                    <CardTop>
                        <CardHeader>Select Your Options</CardHeader>
                    </CardTop>
                    <CardContent>
                        <OptionsForm />
                    </CardContent>
                </Card>
            </Wrapper>
        </>
    );
}

export default OptionsCard;
