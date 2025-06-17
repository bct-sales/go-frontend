import DateTimeViewer from "@/components/DateTimeViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { DateTime } from "@/datetime";
import { Table } from "@mantine/core";
import { DataTable } from "mantine-datatable";
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
        <DataTable
            striped
            highlightOnHover
            records={sales}
            columns={[
                {
                    accessor: "saleId",
                    title: "Sale ID",
                },
                {
                    accessor: "cashierId",
                    title: "Cashier ID",
                    render: (sale) => <UserIdViewer userId={sale.cashierId} />,
                },
                {
                    accessor: "transactionTime",
                    title: "Transaction Time",
                    render: (sale) => <DateTimeViewer dateTime={sale.transactionTime} />,
                },
                {
                    accessor: "itemCount",
                    title: "Item Count",
                },
                {
                    accessor: "totalPriceInCents",
                    title: "Total Price",
                    render: (sale) => <Price priceInCents={sale.totalPriceInCents} />,
                },
            ]}
        />
    );


}