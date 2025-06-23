import DateTimeViewer from "@/components/DateTimeViewer";
import Price from "@/components/Price";
import SaleIdViewer from "@/components/SaleIdViewer";
import UserIdViewer from "@/components/UserIdViewer";
import { DateTime } from "@/datetime";
import { DataTable } from "mantine-datatable";
import React from "react";

interface Props
{
    sales: Sale[];
}

export interface Sale
{
    saleId: number;
    cashierId: number;
    transactionTime: DateTime;
    itemCount: number;
    totalPriceInCents: number;
    items?: Item[];
}

export interface Item
{
	itemId: number;
	sellerId: number;
	description: string;
	priceInCents: number;
	categoryId: number;
	charity: boolean;
	donation: boolean;
}

export default function SalesTable(props: Props): React.ReactNode
{
    const { sales } = props;

    return (
        <DataTable
            striped
            records={sales}
            idAccessor="saleId"
            height="calc(100vh - 200px)"
            columns={[
                {
                    accessor: "saleId",
                    title: "Sale ID",
                    render: (sale) => <SaleIdViewer saleId={sale.saleId} />,
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