import DateTimeViewer from "@/components/DateTimeViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { DateTime } from "@/datetime";
import { Box, Group, Stack, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React from "react";
import classes from "./SalesTable.module.css";
import CharityViewer from "@/components/CharityViewer";
import DonationViewer from "@/components/DonationViewer";
import SaleIdViewer from "@/components/SaleIdViewer";

interface Props
{
    sales: Sale[];
    requestSaleDetails?: (saleIndex: number) => void;
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
            records={sales}
            idAccessor="saleId"
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