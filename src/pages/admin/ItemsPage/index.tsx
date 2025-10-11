import Loading from "@/components/Loading";
import { Item, listItems, SuccessResponse, Options } from "@/rest/list-items";
import { paths } from "@/rest/paths";
import { RestStatus } from "@/rest/status";
import { range } from "@/util";
import { Center, Group, Input, Pagination, Select, Stack, Table } from "@mantine/core";
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
    const [itemsStatus, setItemsStatus] = useState<RestStatus<SuccessResponse>>({status: "loading"});
    const itemsPerPage = 20;
    const [page, setPage] = useState(1);
    const [descriptionFilter, setDescriptionFilter] = useState("");
    const [debouncedDescriptionFilter, setDebouncedDescriptionFilter] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setPage(1);
            setDebouncedDescriptionFilter(descriptionFilter);
        }, 1000);

        return () => clearTimeout(handler);
    }, [descriptionFilter]);

    useEffect(() => {
        void (async () => {
            const options: Options = { rowRange: { start: itemsPerPage * (page - 1), count: itemsPerPage } };

            if ( debouncedDescriptionFilter.length !== 0 )
            {
                options.descriptionFilter = debouncedDescriptionFilter;
            }

            const response = await listItems(options);

            if (response.success)
            {
                setItemsStatus({status: "success", value: response.value});
            }
            else
            {
                setItemsStatus({status: "error", tag: response.error.type, details: response.error.details});
            }
        })();
    }, [page, debouncedDescriptionFilter]);

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
        const pageRange = range(1, lastPage + 1).map(p => `${p}`);
        const exportFormats = [
            {
                caption: 'CSV',
                url: paths.items.withFormat('csv'),
                filename: 'items.csv',
            },
            {
                caption: 'JSON',
                url: paths.items.withFormat('json'),
                filename: 'items.json',
            },
        ];

        return (
            <>
                <Stack>
                    {renderOverview()}
                    {renderFilteringControls()}
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


        function renderFilteringControls(): React.ReactNode
        {
            return (
                <Table>
                    <Table.Tbody>
                        <Table.Th>
                            Description
                        </Table.Th>
                        <Table.Td>
                            <Input value={descriptionFilter} onChange={e => setDescriptionFilter(e.currentTarget.value)} />
                        </Table.Td>
                    </Table.Tbody>
                </Table>
            );
        }

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
