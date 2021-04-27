import React, { createContext, useReducer, useState } from 'react';
import { Question } from '../api/TriviaDBApi';

/* ------------- TYPES --------- */
interface IQuizContext {
    selectedCategory: number;
    currentQuestion: number;
    answeredCount: number;
    correctCount: number;
    selectedAnswer: string;
    quizStage: QuizStage;
    questions: Question[];
}

export enum QuizStage {
    selectAnswer,
    reviewAnswer,
    quizComplete,
}

enum ReducerActionType {
    SelectCategory,
    SetQuestions,
    SubmitAnswer,
    SelectAnswer,
    NextQuestion,
}

type Action =
    | { type: ReducerActionType.NextQuestion }
    | { type: ReducerActionType.SetQuestions; payload: Question[] }
    | { type: ReducerActionType.SubmitAnswer }
    | { type: ReducerActionType.SelectAnswer; payload: string }
    | { type: ReducerActionType.SelectCategory; payload: number };

/* ------------- REDUCER --------- */

const initialState: IQuizContext = {
    selectedCategory: 0,
    currentQuestion: 0,
    answeredCount: 0,
    correctCount: 0,
    selectedAnswer: '',
    quizStage: QuizStage.selectAnswer,
    questions: [],
};

function quizReducer(state: IQuizContext, action: Action): IQuizContext {
    switch (action.type) {
        case ReducerActionType.SelectCategory:
            return { ...state, selectedCategory: action.payload };
        case ReducerActionType.SubmitAnswer:
            return submitAnswer(state);
        case ReducerActionType.NextQuestion:
            return nextQuestion(state);
        case ReducerActionType.SelectAnswer:
            return selectAnswer(state, action.payload);
        case ReducerActionType.SetQuestions:
            return { ...initialState, questions: action.payload };
        default:
            return state;
    }
}

function selectAnswer(state: IQuizContext, payload: string): IQuizContext {
    const { quizStage } = state;

    if (quizStage !== QuizStage.selectAnswer) return state;

    return { ...state, selectedAnswer: payload };
}

function nextQuestion(state: IQuizContext): IQuizContext {
    const { quizStage, answeredCount, questions, currentQuestion } = state;

    if (quizStage !== QuizStage.reviewAnswer) return state;

    const output = {
        currentQuestion: currentQuestion + 1,
        selectedAnswer: '',
        quizStage: QuizStage.selectAnswer,
    };

    return { ...state, ...output };
}

function submitAnswer(state: IQuizContext): IQuizContext {
    const {
        selectedAnswer,
        currentQuestion,
        questions,
        correctCount,
        answeredCount,
        quizStage,
    } = state;

    if (!selectedAnswer) return state;

    const newCorrectCount =
        selectedAnswer === questions[currentQuestion].correct_answer
            ? correctCount + 1
            : correctCount;

    const newAnsweredCount = answeredCount + 1;

    const nextStage =
        newAnsweredCount === questions.length ? QuizStage.quizComplete : QuizStage.reviewAnswer;

    const output = {
        answeredCount: newAnsweredCount,
        correctCount: newCorrectCount,
        quizStage: nextStage,
    };

    return { ...state, ...output };
}

/* ------------- CONTEXT --------- */
const QuizContextConsumer = createContext<IQuizContext>(undefined as any);
const QuizContextDispatcher = createContext<React.Dispatch<Action>>(undefined as any);

function QuizContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(quizReducer, initialState);

    return (
        <QuizContextConsumer.Provider value={state}>
            <QuizContextDispatcher.Provider value={dispatch}>
                {children}
            </QuizContextDispatcher.Provider>
        </QuizContextConsumer.Provider>
    );
}

export { QuizContextProvider, QuizContextConsumer, QuizContextDispatcher, ReducerActionType };
