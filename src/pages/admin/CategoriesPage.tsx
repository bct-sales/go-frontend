import CategoryCountsTable from "@/components/CategoryCountsTable";
import Loading from "@/components/Loading";
import { getItemCountsPerCategory, ItemCountByCategory } from "@/rest/category-counts";
import { RestStatus } from "@/rest/status";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import { Table } from "@mantine/core";


export default function CategoriesSubpage() : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<ItemCountByCategory[]>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            const data = await getItemCountsPerCategory();

            if (data.success)
            {
                setStatus({ status: 'success', value: data.value.counts });
            }
            else
            {
                setStatus({ status: 'error', tag: data.error.type, details: data.error.details });
            }
        })();
    }, []);

    switch (status.status)
    {
        case 'success':
            return renderPage(status.value);

        case 'loading':
            return (
                <Loading message="Loading category counts..." />
            );

        case 'error':
            return (
                <ErrorPage>
                    <Table variant="vertical">
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th>Tag</Table.Th>
                                <Table.Td>{status.tag}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>Details</Table.Th>
                                <Table.Td>{status.details}</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </ErrorPage>
            );
    }


    function renderPage(categoryCounts: ItemCountByCategory[]) : React.ReactNode
    {
        return (
            <CategoryCountsTable categoryCounts={categoryCounts} />
        );
    }
}
