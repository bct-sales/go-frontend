import ItemsTable from "@/components/ItemsTable";
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
                setItems(response.value.items);
            }
            else
            {
                console.error(response.error.details);
            }
        })();
    }, []);

    return (
        <>
            <ItemsTable items={items} />
        </>
    );
}
