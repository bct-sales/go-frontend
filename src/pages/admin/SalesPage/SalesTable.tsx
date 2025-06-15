import DateTimeViewer from "@/components/DateTimeViewer";
import Price from "@/components/Price";
import { DateTime } from "@/datetime";
import { Table } from "@mantine/core";
import React from "react";

interface Props
{
    sales: Sale[];
}

interface Sale
{
    saleId: number;
    cashierId: number;
    transactionTime: DateTime;
    itemCount: number;
    totalPriceInCents: number;
}

export default function SalesTable(props: Props): React.ReactNode
{
    const { sales } = props;

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Sale ID</Table.Th>
                    <Table.Th>Cashier ID</Table.Th>
                    <Table.Th>Item Count</Table.Th>
                    <Table.Th>Total</Table.Th>
                    <Table.Th>Transaction Time</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {renderRows()}
            </Table.Tbody>
        </Table>
    );


    function renderRows(): React.ReactNode
    {
        return sales.map(renderRow);
    }

    function renderRow(sale: Sale): React.ReactNode
    {
        return (
            <Table.Tr key={sale.saleId}>
                <Table.Td>{sale.saleId}</Table.Td>
                <Table.Td>{sale.cashierId}</Table.Td>
                <Table.Td>{sale.itemCount}</Table.Td>
                <Table.Td>
                    <Price priceInCents={sale.totalPriceInCents} />
                </Table.Td>
                <Table.Td>
                    <DateTimeViewer dateTime={sale.transactionTime} />
                </Table.Td>
            </Table.Tr>
        );
    }
}