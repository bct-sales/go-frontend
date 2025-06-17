import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, charityColumn, countColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import { Item } from "@/components/ItemsTable/ItemsTable";

interface Props
{
    items: Item[];
    count: (item: Item) => number;
    setCount: (item: Item, n: number) => void;
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
        charityColumn,
        donationColumn,
    ];

    return (
        <ItemsTable items={items} columns={columns} />
    );
}