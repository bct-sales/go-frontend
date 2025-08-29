import Loading from "@/components/Loading";
import { listItems, Item } from "@/rest/list-items";
import { RestStatus } from "@/rest/status";
import { Button, Center, Group, Menu, Pagination, Select, Stack } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemsTable from "./ItemsTable";
import { range } from "@/util";
import DownloadAs from "@/components/DownloadAs";
import { paths } from "@/rest/paths";


export default function ItemsPage() : React.ReactNode
{
    const itemsPagePage = 20;
    const [itemsStatus, setItemsStatus] = useState<RestStatus<{items: Item[], totalItemCount: number}>>({status: "loading"});
    const [page, setPage] = useState(1);
    const refresh = useCallback(async () => {
        const response = await listItems(itemsPagePage * (page - 1), itemsPagePage);

        if (response.success)
        {
            setItemsStatus({status: "success", value: { items: response.value.items, totalItemCount: response.value.totalItemCount }});
        }
        else
        {
            setItemsStatus({status: "error", tag: response.error.type, details: response.error.details});
        }
    }, [page]);
    useEffect(() => { refresh(); }, [refresh]);

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
        const cvsUrl = paths.itemsAsCsv;
        const jsonUrl = paths.itemsAsJson;
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
                        <DownloadAs cvsUrl={cvsUrl} jsonUrl={jsonUrl} />
                    </Group>
                    <Center>
                        <ItemsTable items={items} />
                    </Center>
                </Stack>
            </>
        );
    }
}
