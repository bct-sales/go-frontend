import { useCategoryContext } from "@/categories";


interface Props
{
    categoryId: number;
}

export default function ActualCategoryViewer(props: Props): React.ReactNode
{
    const categoryTable = useCategoryContext();

    return (
        <>{categoryTable.categoryName(props.categoryId)}</>
    );
}