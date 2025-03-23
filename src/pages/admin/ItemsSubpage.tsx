import ItemTable from "@/components/ItemTable";
import { listItems, Item } from "@/rest/admin/list-items";
import { useEffect, useState } from "react";


export default function ItemsSubpage() : React.ReactNode
{
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        void (async () => {
            const response = await listItems();

            if (response.success)
            {
                setItems(response.value);
            }
            else
            {
                console.log(`Failed to list items`);
                // TODO handle error
            }
        })();
    }, []);

    return (
        <>
            <ItemTable items={items} />
        </>
    );
}
