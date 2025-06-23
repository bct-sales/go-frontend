import Loading from "@/components/Loading";
import { listItems, Item } from "@/rest/list-items";
import { RestStatus } from "@/rest/status";
import { Button, Center, Group, Menu, Pagination, Select, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemsTable from "./ItemsTable";
import { range } from "@/util";


export default function ItemsPage() : React.ReactNode
{
    const [itemsStatus, setItemsStatus] = useState<RestStatus<{items: Item[], totalItemCount: number}>>({status: "loading"});
    const [page, setPage] = useState(1);
    const itemsPagePage = 20;

    useEffect(() => {
        void (async () => {
            const response = await listItems(itemsPagePage * (page - 1), itemsPagePage);

            if (response.success)
            {
                setItemsStatus({status: "success", value: { items: response.value.items, totalItemCount: response.value.totalItemCount }});
            }
            else
            {
                setItemsStatus({status: "error", tag: response.error.type, details: response.error.details});
            }
        })();
    }, [page]);

    switch (itemsStatus.status)
    {
        case "success":
            return renderPage(itemsStatus.value.items, itemsStatus.value.totalItemCount);

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


    function renderPage(items: Item[], totalItemCount: number): React.ReactNode
    {
        const cvsUrl = `/api/v1/items?format=csv`;
        const jsonUrl = `/api/v1/items?format=json`;
        const lastPage = Math.ceil(totalItemCount / itemsPagePage);
        const pageRange = range(1, lastPage).map(p => `${p}`);

        return (
            <>
                <Stack>
                    <Group justify="space-between" align="center" mb="md">
                        <Group>
                            <Pagination value={page} onChange={setPage} total={lastPage} boundaries={1} />
                            <Select searchable value={`${page}`} onChange={s => setPage(parseInt(s || '0'))} data={pageRange} w='5em' />
                        </Group>
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
                    <Center>
                        <ItemsTable items={items} />
                    </Center>
                </Stack>
            </>
        );
    }
}
