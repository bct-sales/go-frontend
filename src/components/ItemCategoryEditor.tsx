import { Select } from "@mantine/core";

export default function ItemCategoryEditor(): React.ReactNode
{
    const itemCategories = [
        { value: '1', label: 'Category 1' },
        { value: '2', label: 'Category 2' },
        { value: '3', label: 'Category 3' },
        { value: '4', label: 'Category 4' },
        { value: '5', label: 'Category 5' },
    ];

    return (
        <Select label="Category" data={itemCategories} withCheckIcon={false} allowDeselect={false} />
    );
}