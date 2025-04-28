import { CategoryTable, useCategories } from "@/categories";
import { Select } from "@mantine/core";
import Loading from "./Loading";


export default function ItemCategoryEditor(): React.ReactNode
{
    const categories = useCategories();

    switch ( categories.status )
    {
        case "loading":
            return (
                <Loading message="Loading categories..." />
            );

        case "error":
            return (
                <div>Error loading categories</div>
            );

        case "success":
            return renderComponent( categories.value );
    }


    function renderComponent(categoryTable: CategoryTable): React.ReactNode
    {
        const itemCategories = categoryTable.categoryIds.map( ( categoryId ) =>
            {
                return {
                    value: `${categoryId}`,
                    label: categoryTable.categoryName(categoryId),
                };
            }
        );

        return (
            <Select label="Category" data={itemCategories} withCheckIcon={false} allowDeselect={false} />
        );
    }
}