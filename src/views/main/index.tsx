import CategoryCard from '../categorycard';
import OptionsCard from '../optionscard';
import QuizCard from '../quizcard';
import Container from '../../components/container';
import { ViewSlider, ViewSlide } from '../../components/viewslider';
import { GetStarted } from '../getstarted';
import { QuizRecap } from '../quizrecap';

export default function Main() {
    return (
        <ViewSlider>
            <ViewSlide>
                <Container>
                    <GetStarted />
                </Container>
            </ViewSlide>
            <ViewSlide>
                <Container>
                    <CategoryCard />
                </Container>
            </ViewSlide>
            <ViewSlide>
                <Container>
                    <OptionsCard />
                </Container>
            </ViewSlide>
            <ViewSlide>
                <Container>
                    <QuizCard />
                </Container>
            </ViewSlide>
            <ViewSlide>
                <Container>
                    <QuizRecap />
                </Container>
            </ViewSlide>
        </ViewSlider>
    );
}
