import { useCategories } from "@/categories";

interface Props
{
    categoryId: number;
}

export default function CategoryViewer(props: Props): React.ReactNode
{
    const categoryTable = useCategories();

    switch (categoryTable.status)
    {
        case 'loading':
            return <>Loading</>;
        case 'error':
            return <span>Error: {categoryTable.details}</span>;
        case 'success':
            return (
                <>{categoryTable.value.categoryName(props.categoryId)}</>
            );
    }
}