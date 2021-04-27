import { useEffect, useState } from 'react';

import { getCategories, Category as CategoryType } from '../../api/TriviaDBApi';
import Category from './Category';
import Alert from '../../components/alert';
import { CategoryGrid } from './styles';
import Progress from '../../components/progress';

export default function CategoryPicker() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cat = await getCategories();

                setCategories(cat);
                setFetchError(null);
            } catch (error) {
                setFetchError(
                    'There was an issue getting category information. Please try again later.'
                );
            }

            setIsLoading(false);
        };

        fetchCategories();
    }, []);

    console.log(categories);

    if (isLoading) return <Progress />;
    if (fetchError) return <Alert>{fetchError}</Alert>;

    return (
        <CategoryGrid>
            {categories.map((cat) => (
                <Category key={cat.id} categoryName={cat.name} categoryId={cat.id} />
            ))}
        </CategoryGrid>
    );
}
