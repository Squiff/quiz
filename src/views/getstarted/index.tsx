import Button from '../../components/button';
import Flex from '../../components/flex';
import { StyledLogo } from './styles';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import { useContext } from 'react';

function GetStarted() {
    const dispatch = useContext(ViewSliderDispatcher);

    return (
        <>
            <StyledLogo>QUIZ</StyledLogo>

            <Flex justifyContent="center">
                <Button
                    onClick={() => {
                        dispatch({ type: dispatchAction.Next });
                    }}
                    variant="glass"
                >
                    Get Started
                </Button>
            </Flex>
        </>
    );
}

export { GetStarted };
