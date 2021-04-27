import styled from 'styled-components';

interface StyledCategoryProps {
    selected?: boolean;
}

const attrsFactory = (props: StyledCategoryProps) => ({
    'aria-pressed': props.selected,
});

const Category = styled.button.attrs(attrsFactory)<StyledCategoryProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${(props) =>
        props.selected ? props.theme.colors.primaryLight : props.theme.colors.primary};
    color: #fff;
    border-radius: 0.25rem;
    padding: 0.75rem;
    font-weight: 400;
    font-size: 1.125rem;
    font-family: inherit;
    border: none;
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        opacity: 0.95;
    }

    &:focus:not(:focus-visible) {
        outline: none;
    }
`;

const CategoryGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: 1fr;
    gap: 5px;
    padding: 0;
`;

export { Category, CategoryGrid };
