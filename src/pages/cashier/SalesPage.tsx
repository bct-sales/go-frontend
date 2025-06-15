import DateTimeViewer from "@/components/DateTimeViewer";
import Loading from "@/components/Loading";
import Price from "@/components/Price";
import { listCashierSales, Sale } from "@/rest/list-cashier-sales";
import { RestStatus } from "@/rest/status";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";


interface Props
{
    cashierId: number;
}


export default function SalesPage(props: Props): React.ReactNode
{
    const [antiChronologicalSalesStatus, setSalesStatus] = useState<RestStatus<Sale[]>>({status: "loading"});
    useEffect(() => {
            void (async () => {
                const response = await listCashierSales(props.cashierId);

                if (response.success)
                {
                    const sales = response.value.sales;
                    sales.reverse();
                    setSalesStatus({status: "success", value: sales});
                }
                else
                {
                    setSalesStatus({status: "error", tag: response.error.type, details: response.error.details});
                }
            })();
        }, [props.cashierId]);

    switch (antiChronologicalSalesStatus.status)
    {
        case "success":
            return renderPage(antiChronologicalSalesStatus.value);

        case "loading":
            return (
                <Loading message="Loading items..." />
            );

        case "error":
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {antiChronologicalSalesStatus.tag}: {antiChronologicalSalesStatus.details}
                </div>
            );
    }


    function renderPage(antiChronologicalSales: Sale[]): React.ReactNode
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
            return (
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