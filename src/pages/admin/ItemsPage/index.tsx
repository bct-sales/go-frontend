import DownloadAs from "@/components/DownloadAs";
import Loading from "@/components/Loading";
import { Item, listItems, SuccessResponse } from "@/rest/list-items";
import { paths } from "@/rest/paths";
import { RestStatus } from "@/rest/status";
import { range } from "@/util";
import { Center, Group, Pagination, Select, Stack } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import ItemsTable from "./ItemsTable";


export default function ItemsPage() : React.ReactNode
{
    const itemsPerPage = 20;
    const [itemsStatus, setItemsStatus] = useState<RestStatus<SuccessResponse>>({status: "loading"});
    const [page, setPage] = useState(1);
    const refresh = useCallback(async () => {
        const response = await listItems(itemsPerPage * (page - 1), itemsPerPage);

        if (response.success)
        {
            setItemsStatus({status: "success", value: response.value});
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
            return renderPage(itemsStatus.value.items, itemsStatus.value.totalItemCount, itemsStatus.value.totalItemValue);

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


    function renderPage(items: Item[], totalItemCount: number, totalItemValue: number): React.ReactNode
    {
        const cvsUrl = paths.itemsAsCsv;
        const jsonUrl = paths.itemsAsJson;
        const lastPage = Math.ceil(totalItemCount / itemsPerPage);
        const pageRange = range(1, lastPage).map(p => `${p}`);

        return (
            <>
                <Stack>
                    <Group justify="space-between" align="center" mb="md">
                        {renderPaginationControls()}
                        <DownloadAs cvsUrl={cvsUrl} jsonUrl={jsonUrl} />
                    </Group>
                    <Center>
                        <ItemsTable items={items} />
                    </Center>
                </Stack>
            </>
        );


        function renderPaginationControls(): React.ReactNode
        {
            const needsMoreThanOnePage = totalItemCount > itemsPerPage;

            if ( !needsMoreThanOnePage )
            {
                // Dummy element needed so that space-between still works correctly
                return <span />;
            }
            else
            {
                return (
                    <Group>
                        <Pagination value={page} onChange={setPage} total={lastPage} boundaries={1} />
                        <Select searchable value={`${page}`} onChange={s => setPage(parseInt(s || '0'))} data={pageRange} w='5em' />
                    </Group>
                );
            }
        }
    }
}
