import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, countColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import { Item } from "@/components/ItemsTable/ItemsTable";
import { Button, Stack, Text } from "@mantine/core";

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
            {renderExplanations()}
            <ItemsTable items={items} columns={columns} />
            <Button onClick={props.goToNextStep}>Next Step</Button>
        </Stack>
    );


    function renderExplanations(): React.ReactNode
    {
        return <></>;
        // return (
        //     <Text>
        //         Here you can specify how many labels you want to print for each item.
        //         We strongly recommend you print at least two labels for each item.
        //         If the item consists of multiple disjoint parts, you should print a label for each part.
        //     </Text>
        // );
    }
}