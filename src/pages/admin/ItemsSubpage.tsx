import ItemsTable from "@/components/ItemsTable";
import Loading from "@/components/Loading";
import { listItems, Item } from "@/rest/admin/list-items";
import { RestStatus } from "@/rest/status";
import { Button, Group, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
        case "success":
            return renderPage(itemsStatus.value);

        case "loading":
            return (
                <Loading message="Loading items..." />
            );

        case "error":
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {itemsStatus.tag}: {itemsStatus.details}
                </div>
            );
    }


    function renderPage(items: Item[]): React.ReactNode
    {
        const url = `/api/v1/items?format=csv`;

        return (
            <>
                <Stack>
                    <Group justify="flex-end" align="center" mb="md">
                        <Link to={url} target="_blank" download="items.csv">
                            CSV
                        </Link>
                    </Group>
                    <ItemsTable items={items} />
                </Stack>
            </>
        );
    }
}
