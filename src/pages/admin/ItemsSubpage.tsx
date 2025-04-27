import ItemsTable from "@/components/ItemsTable";
import { listItems, Item } from "@/rest/admin/list-items";
import { RestStatus } from "@/rest/status";
import React, { useEffect, useState } from "react";


export default function ItemsSubpage() : React.ReactNode
{
    const [itemsStatus, setItemsStatus] = useState<RestStatus<Item[]>>({status: "loading"});

    useEffect(() => {
        void (async () => {
            const response = await listItems();

            if (response.success)
            {
                setItemsStatus({status: "success", value: response.value.items});
            }
            else
            {
                setItemsStatus({status: "error", tag: response.error.type, details: response.error.details});
            }
        })();
    }, []);

    switch (itemsStatus.status)
    {
        case "loading":
            return <div>Loading...</div>;
        case "error":
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {itemsStatus.tag}: {itemsStatus.details}
                </div>
            );
        case "success":
            return renderItems(itemsStatus.value);
    }


    function renderItems(items: Item[]): React.ReactNode
    {
        return (
            <>
                <ItemsTable items={items} />
            </>
        );
    }
}
