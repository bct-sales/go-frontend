import DateTimeViewer from "@/components/DateTimeViewer";
import Loading from "@/components/Loading";
import Price from "@/components/Price";
import { listRecentCashierSales, Sale, SuccessResponse } from "@/rest/list-cashier-sales";
import { RestStatus } from "@/rest/status";
import { Center, Pagination, Stack, Table } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";


interface Props
{
    cashierId: number;
}


export default function SalesPage(props: Props): React.ReactNode
{
    const salesPerPage = 10;
    const [status, setStatus] = useState<RestStatus<SuccessResponse>>({status: "loading"});
    const [oneIndexedPage, setOneIndexedPage] = useState<number>(1);
    const refresh = useCallback(async () => {
        const response = await listRecentCashierSales(props.cashierId, salesPerPage, (oneIndexedPage - 1) * salesPerPage);

        if (response.success)
        {
            setStatus({status: "success", value: response.value});
        }
        else
        {
            setStatus({status: "error", tag: response.error.type, details: response.error.details});
        }
    }, [props.cashierId, oneIndexedPage]);

    useEffect(() => { refresh(); }, [props.cashierId, refresh]);

    switch (status.status)
    {
        case "success":
            return renderPage(status.value.saleCount, status.value.sales);

        case "loading":
            return (
                <Loading message="Loading items..." />
            );

        case "error":
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {status.tag}: {status.details}
                </div>
            );
    }


    function renderPage(totalSaleCount: number, antiChronologicalSales: Sale[]): React.ReactNode
    {
        if (antiChronologicalSales.length === 0)
        {
            return (
                <>
                    No sales found for this cashier.
                </>
            );
        }
        else
        {
            console.log(totalSaleCount, salesPerPage)
            const lastPage = Math.ceil(totalSaleCount / salesPerPage);

            return (
                <Stack>
                    <Center mb='xl'>
                        <Pagination total={lastPage} value={oneIndexedPage} onChange={setOneIndexedPage} />
                    </Center>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Sale ID</Table.Th>
                                <Table.Th>Item Count</Table.Th>
                                <Table.Th>Total</Table.Th>
                                <Table.Th>Transaction Time</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {antiChronologicalSales.map(renderSale)}
                        </Table.Tbody>
                    </Table>
                </Stack>
            );


            function renderSale(sale: Sale): React.ReactNode
            {
                return (
                    <Table.Tr key={sale.saleId}>
                        <Table.Td>{sale.saleId}</Table.Td>
                        <Table.Td>{sale.itemCount}</Table.Td>
                        <Table.Td><Price priceInCents={sale.totalPriceInCents} /></Table.Td>
                        <Table.Td><DateTimeViewer dateTime={sale.transactionTime} /></Table.Td>
                    </Table.Tr>
                );
            }
        }
    }
}