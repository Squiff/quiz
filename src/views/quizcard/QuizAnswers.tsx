import { QuizAnswers as StyledQuizAnswers } from './styles';
import QuizAnswer from './QuizAnswer';

interface Props {
    answers: string[];
}

export default function QuizAnswers({ answers }: Props) {
    return (
        <StyledQuizAnswers>
            {answers.map((a) => (
                <QuizAnswer answer={a} key={a} />
            ))}
        </StyledQuizAnswers>
    );
}
