import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, charityColumn, countColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn, smartSelectionColumn } from "@/components/ItemsTable/columns";
import { Item } from "@/rest/item-data";
import { useState } from "react";


interface Props
{
    items: Item[];
    isItemSelected: (item: Item) => boolean;
    setItemSelection: (item: Item, selected: boolean) => void;
}

export default function AdvancedItemSelectionSubpage(props: Props): React.ReactNode
{
    const [ activeItemIndex, setActiveItemIndex ] = useState<number | null>(null);
    const { items, isItemSelected, setItemSelection } = props;
    const columns = [
        smartSelectionColumn({isSelected: i => isItemSelected(items[i]), onChangeSelected: (i, b) => setItemSelection(items[i], b), itemCount: items.length, activeItemIndex}),
        itemIdColumn,
        descriptionColumn,
        categoryColumn,
        priceInCentsColumn,
        charityColumn,
        donationColumn,
    ];

    return (
        <ItemsTable items={items} columns={columns} onItemDoubleClicked={onItemDoubleClicked} />
    );


    function onItemDoubleClicked(_item: Item, itemIndex: number): void
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
}