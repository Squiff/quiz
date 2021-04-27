import React, { useContext } from 'react';
import { Category as StyledCategory } from './styles';

import {
    QuizContextDispatcher,
    QuizContextConsumer,
    ReducerActionType,
} from '../../context/QuizContext';

interface CategoryProps {
    categoryName: string;
    categoryId: number;
}

const Category = ({ categoryName, categoryId }: CategoryProps) => {
    const { selectedCategory } = useContext(QuizContextConsumer);

    const dispatch = useContext(QuizContextDispatcher);

    return (
        <StyledCategory
            onClick={() => {
                dispatch({ type: ReducerActionType.SelectCategory, payload: categoryId });
            }}
            selected={selectedCategory === categoryId}
        >
            {categoryName}
        </StyledCategory>
    );
};

export default Category;
