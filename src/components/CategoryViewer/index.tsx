import CategoryProvider from '@/components/CategoryProvider';
import ActualCategoryViewer from './ActualCategoryViewer';


interface Props
{
    categoryId: number;
}

export default function CategoryViewer(props: Props): React.ReactElement
{
    return (
        <CategoryProvider>
            <ActualCategoryViewer categoryId={props.categoryId} />
        </CategoryProvider>
    );
}