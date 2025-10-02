import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, countColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import { Item } from "@/components/ItemsTable/ItemsTable";
import { Button, Center, Stack } from "@mantine/core";

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
            <Center>
                <Button onClick={props.goToNextStep} w='50%'>Next Step</Button>
            </Center>
        </Stack>
    );


    function renderExplanations(): React.ReactNode
    {
        return (
            <Center>
                <Card w='50%' m='xl'>
                    <Text>
                        Below is a list of all items you entered. You can choose how many labels you wish to print for each.
                        We strongly recommend printing two labels per item.
                        If an item consists of multiple disjoint parts, you should print out one label per part.
                        This helps on the day of the sale in case a label gets accidentally detached, or parts of the same item get separated.
                    </Text>
                </Card>
            </Center>
        );
    }
}

\ No newline at end of file
