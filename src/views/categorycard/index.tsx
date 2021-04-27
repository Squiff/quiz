import { useContext } from 'react';
import CategoryPicker from './CategoryPicker';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import { Card, CardHeader, CardContent, CardTop } from '../../components/card';
import Flex from '../../components/flex';
import Wrapper from '../../components/wrapper';
import Button from '../../components/button';

function CategoryCard() {
    const dispatch = useContext(ViewSliderDispatcher);

    return (
        <>
            <Flex>
                <Wrapper marginLeft="auto">
                    <Button
                        variant="glass"
                        onClick={() => {
                            dispatch({ type: dispatchAction.Next });
                        }}
                    >
                        Next
                    </Button>
                </Wrapper>
            </Flex>
            <Wrapper marginTop="0.75rem">
                <Card>
                    <CardTop>
                        <CardHeader>Select Your Category</CardHeader>
                    </CardTop>
                    <CardContent>
                        <CategoryPicker />
                    </CardContent>
                </Card>
            </Wrapper>
        </>
    );
}

export default CategoryCard;
