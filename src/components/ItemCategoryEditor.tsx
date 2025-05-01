import { CategoryTable, useCategories } from "@/categories";
import { Select } from "@mantine/core";
import Loading from "./Loading";


interface Props
{
    categoryId: number | undefined;
    setCategoryId: (categoryId: number) => void;
}

export default function ItemCategoryEditor(props: Props): React.ReactNode
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
            <Select label="Category" data={itemCategories} withCheckIcon={false} allowDeselect={false} value={props.categoryId?.toString()} onChange={onChange} />
        );


        function onChange(value: string | null): void
        {
            if ( value === null )
            {
                console.error("ItemCategoryEditor: onChange: value is null");
                return;
            }

            const categoryId = parseInt(value);

            if ( isNaN(categoryId) )
            {
                console.error("ItemCategoryEditor: onChange: categoryId is NaN");
                return;
            }

            props.setCategoryId(categoryId);
        }
    }
}