import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, descriptionColumn, itemIdColumn, selectionColumn } from "@/components/ItemsTable/columns";
import { Item } from "@/rest/item-data";

interface Props
{
    items: Item[];
    isItemSelected: (item: Item) => boolean;
    setItemSelection: (item: Item, selected: boolean) => void;
}

export default function ItemSelectionSubpage(props: Props): React.ReactNode
{
    const { items, isItemSelected, setItemSelection } = props;
    const columns = [
        selectionColumn(isItemSelected, setItemSelection),
        itemIdColumn,
        descriptionColumn,
        categoryColumn,
    ];

    return (
        <ItemsTable items={items} columns={columns} />
    );
}