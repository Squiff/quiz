import React, { useContext, useState } from 'react';
import { getQuestions, QDifficulty, QType } from '../../api/TriviaDBApi';
import {
    QuizContextConsumer,
    QuizContextDispatcher,
    ReducerActionType,
} from '../../context/QuizContext';
import { ViewSliderDispatcher, dispatchAction } from '../../components/viewslider';
import { Input, Label, FormGroup, FormValidationText } from '../../components/form';
import Button from '../../components/button';
import Alert from '../../components/alert';

interface FormFields {
    qcount: number;
    qdifficulty: QDifficulty;
    qtype: QType;
}

type FieldErrors = {
    [Property in keyof FormFields]?: string;
};

const initialState: FormFields = {
    qcount: 10,
    qdifficulty: 'any',
    qtype: 'any',
};

function OptionsForm() {
    const [formState, setFormState] = useState(initialState);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const { selectedCategory } = useContext(QuizContextConsumer);
    const dipatch = useContext(QuizContextDispatcher);
    const dispatchSlider = useContext(ViewSliderDispatcher);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { value, name } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    }

    function validateFields() {
        let valid = true;
        const newFieldErrors: FieldErrors = {};

        if (formState.qcount < 1 || formState.qcount > 50) {
            newFieldErrors.qcount = 'Number of questions should be between 1 and 50';
            valid = false;
        }

        setFieldErrors(newFieldErrors);
        return valid;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // do nothing if request in flight
        if (isLoading) return;

        setFormError(''); // remove any previous fetch errors

        // function will update fieldErrors if invalid
        if (!validateFields()) return;

        const fetchData = async () => {
            setIsLoading(true);

            try {
                const r = await getQuestions({
                    qcategory: selectedCategory,
                    qcount: formState.qcount,
                    qdifficulty: formState.qdifficulty,
                    qtype: formState.qtype,
                });

                dipatch({ type: ReducerActionType.SetQuestions, payload: r.results });
                dispatchSlider({ type: dispatchAction.Next });
            } catch (error) {
                setFormError('There was an issue getting the questions. Please try again later.');
            }

            setIsLoading(false);
        };

        fetchData();
    }

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                <FormGroup>
                    <Label htmlFor="qcount">Number of Questions</Label>
                    <Input
                        type="number"
                        name="qcount"
                        id="qcount"
                        value={formState.qcount}
                        onChange={handleChange}
                        min="1"
                        max="50"
                        required
                    />
                    <FormValidationText msg={fieldErrors.qcount} />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="qdifficulty">Question Difficulty</Label>
                    <Input
                        as="select"
                        name="qdifficulty"
                        id="qdifficulty"
                        value={formState.qdifficulty}
                        onChange={handleChange}
                    >
                        <option value="any">Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="qtype">Question Type</Label>
                    <Input
                        as="select"
                        name="qtype"
                        id="qtype"
                        value={formState.qtype}
                        onChange={handleChange}
                    >
                        <option value="any">Any</option>
                        <option value="boolean">True/False</option>
                        <option value="multiple">Multiple Choice</option>
                    </Input>
                </FormGroup>

                <Button isLoading={isLoading} block>
                    Start Quiz
                </Button>
            </form>
            {formError && <Alert>{formError}</Alert>}
        </>
    );
}

export default OptionsForm;
