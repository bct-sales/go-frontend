import ItemsTable from "@/components/ItemsTable";
import { addedAtColumn, categoryColumn, charityColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn, sellerColumn } from "@/components/ItemsTable/columns";
import Loading from "@/components/Loading";
import { listItems, Item } from "@/rest/admin/list-items";
import { RestStatus } from "@/rest/status";
import { Button, Group, Menu, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function ItemsPage() : React.ReactNode
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
        const cvsUrl = `/api/v1/items?format=csv`;
        const jsonUrl = `/api/v1/items?format=json`;
        const columns = [
            itemIdColumn,
            descriptionColumn,
            addedAtColumn,
            priceInCentsColumn,
            categoryColumn,
            charityColumn,
            donationColumn,
            sellerColumn,
        ];

        return (
            <>
                <Stack>
                    <Group justify="flex-end" align="center" mb="md">
                        <Menu>
                            <Menu.Target>
                                <Button variant="outline">
                                    <IconDownload size={16} stroke={1.5} />
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item component={Link} to={cvsUrl} target="_blank" download="items.csv">
                                    CSV
                                </Menu.Item>
                                <Menu.Item component={Link} to={jsonUrl} target="_blank" download="items.json">
                                    JSON
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    <ItemsTable items={items} columns={columns} />
                </Stack>
            </>
        );
    }
}
