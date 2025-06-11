import CaptionedBox from "@/components/CaptionedBox";
import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, charityColumn, countColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn, smartSelectionColumn } from "@/components/ItemsTable/columns";
import NumberInput from "@/components/NumberInput";
import { Item } from "@/rest/item-data";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";


interface Props
{
    items: Item[];
    count: (item: Item) => number;
    setCount: (item: Item, n: number) => void;
}

export default function AdvancedItemSelectionSubpage(props: Props): React.ReactNode
{
    const [ activeItemIndex, setActiveItemIndex ] = useState<number | null>(null);
    const [ quickAmount, setQuickAmount ] = useState<number>(2);
    const [ itemSelectionTable, setItemSelectionTable ] = useState<{ [id: string]: boolean }>({});
    const { items, count, setCount } = props;
    const columns = [
        smartSelectionColumn({isSelected: i => isItemSelected(items[i]), onChangeSelected: (i, b) => setItemSelection(items[i], b), itemCount: items.length, activeItemIndex}),
        countColumn(count, setCount),
        itemIdColumn,
        descriptionColumn,
        categoryColumn,
        priceInCentsColumn,
        charityColumn,
        donationColumn,
    ];

    return (
        <Stack align="center">
            <CaptionedBox caption="Advanced functionality">
                <Group>
                    <Text>Set selected items to </Text>
                    <NumberInput min={0} step={1} value={quickAmount} onChange={setQuickAmount} w='5em' />
                    <Button onClick={updateAllSelectedItems}>Update</Button>
                </Group>
            </CaptionedBox>
            <ItemsTable items={items} columns={columns} onItemActivated={onItemActivated} />
        </Stack>
    );


    function updateAllSelectedItems(): void
    {
        items.forEach((item) =>
        {
            if (isItemSelected(item))
            {
                setCount(item, quickAmount);
            }
        });
    }

    function onItemActivated(_item: Item, itemIndex: number): void
    {
        if (activeItemIndex === itemIndex)
        {
            setActiveItemIndex(null);
        }
        else
        {
            setActiveItemIndex(itemIndex);
        }
    }

    function isItemSelected(item: Item): boolean
    {
        return itemSelectionTable[item.itemId] ?? false;
    }

    function setItemSelection(item: Item, selected: boolean): void
    {
        setItemSelectionTable(old => ({ ...old, [item.itemId]: selected }));
    }
}