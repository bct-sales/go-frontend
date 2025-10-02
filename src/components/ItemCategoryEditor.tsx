import { CategoryTable, useCategories } from "@/categories";
import { Group, Select, Stack, Text } from "@mantine/core";
import Loading from "./Loading";


interface Props
{
    categoryId: number | null;
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
        ).filter( ({label}) => label !== 'Consumable' );

        const categoryString = props.categoryId?.toString() ?? null;

        return (
            <Stack gap='xs' align="stretch" mt='sm'>
                <Group justify="flex-start" align="center">
                    <Text>Category</Text>
                </Group>
                <Select data={itemCategories} withCheckIcon={false} value={categoryString} onChange={onChange} error={renderError()} searchable />
            </Stack>
        );


        function renderError(): React.ReactNode | undefined
        {
            if ( props.categoryId === null )
            {
                return "Category is required";
            }
            else if ( !categoryTable.categoryIds.includes(props.categoryId) )
            {
                return "Category not found";
            }
            else
            {
                return undefined;
            }
        }

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