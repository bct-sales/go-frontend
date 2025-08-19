import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, countColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import { Item } from "@/components/ItemsTable/ItemsTable";
import { Button, Stack } from "@mantine/core";

interface Props
{
    items: Item[];
    count: (item: Item) => number;
    setCount: (item: Item, n: number) => void;
    goToNextStep: () => void;
}

export default function SimpleItemSelectionSubpage(props: Props): React.ReactNode
{
    const { items } = props;
    const columns = [
        countColumn(props.count, props.setCount),
        itemIdColumn,
        descriptionColumn,
        categoryColumn,
        priceInCentsColumn,
        donationColumn,
    ];

    return (
        <Stack>
            <ItemsTable items={items} columns={columns} />
            <Button onClick={props.goToNextStep}>Next Step</Button>
        </Stack>
    );
}