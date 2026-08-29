import { useCategoryContext } from '@/categories';


interface Props
{
    categoryId: number;
}

export default function ActualCategoryViewer(props: Props): React.ReactElement
{
    const categoryTable = useCategoryContext();

    return (
        <>{categoryTable.categoryName(props.categoryId)}</>
    );
}