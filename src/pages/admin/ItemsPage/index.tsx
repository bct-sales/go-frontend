import DownloadAs from "@/components/DownloadAs";
import Loading from "@/components/Loading";
import { Item, listItems, SuccessResponse } from "@/rest/list-items";
import { paths } from "@/rest/paths";
import { RestStatus } from "@/rest/status";
import { range } from "@/util";
import { Center, Group, Pagination, Select, Stack, Table } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import ItemsTable from "./ItemsTable";
import CaptionedBox from "@/components/CaptionedBox";
import classes from './ItemsPage.module.css';
import Price from "@/components/Price";
import ErrorPage from "@/pages/ErrorPage";
import RestErrorViewer from "@/components/RestErrorViewer";
import ExportButton from "@/components/ExportButton";


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
                <ErrorPage>
                    <RestErrorViewer tag={itemsStatus.tag} details={itemsStatus.details} operation="listItems()" />
                </ErrorPage>
            );
    }


    function renderPage(items: Item[], totalItemCount: number, totalItemValue: number): React.ReactNode
    {
        const lastPage = Math.ceil(totalItemCount / itemsPerPage);
        const pageRange = range(1, lastPage).map(p => `${p}`);
        const exportFormats = [
            {
                caption: 'CSV',
                url: paths.itemsAsCsv,
                filename: 'items.csv',
            },
            {
                caption: 'JSON',
                url: paths.itemsAsJson,
                filename: 'items.json',
            },
        ];

        return (
            <>
                <Stack>
                    {renderOverview()}
                    <Group justify="space-between" align="center" mb="md">
                        {renderPaginationControls()}
                        <ExportButton formats={exportFormats} />
                    </Group>
                    <Center>
                        <ItemsTable items={items} />
                    </Center>
                </Stack>
            </>
        );


        function renderOverview(): React.ReactNode
        {
            return (
                <Center m='xl'>
                    <Group>
                        <CaptionedBox caption="Overview">
                            <Table>
                                <Table.Tbody>
                                    <Table.Tr>
                                        <Table.Th className={classes.key}>Total Item Count</Table.Th>
                                        <Table.Td className={classes.value}>{totalItemCount}</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th className={classes.key}>Total Item Value</Table.Th>
                                        <Table.Td className={classes.value}><Price priceInCents={totalItemValue} /></Table.Td>
                                    </Table.Tr>
                                </Table.Tbody>
                            </Table>
                        </CaptionedBox>
                    </Group>
                </Center>
            );
        }

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
