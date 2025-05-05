import { DateTime } from "@/datetime";
import { Table } from "@mantine/core";
import React from "react";
import classes from './ItemsTable.module.css';

interface Props
{
    items: Item[];
    columns: Column[];
}

export interface Item
{
    itemId: number;
    addedAt: DateTime;
    description: string;
    priceInCents: number,
    categoryId: number;
    sellerId: number;
    donation: boolean;
    charity: boolean;
    frozen: boolean;
}

export interface Column
{
    header: React.ReactNode;
    viewer: (item: Item) => React.ReactNode;
}


export default function ItemsTable(props : Props) : React.ReactNode
{
    const { items, columns } = props;

    return (
        <Table className={classes.itemTable}>
            <Table.Thead>
                <Table.Tr>
                    {columns.map((column, index) => (
                        <Table.Th key={index} className={classes.itemHeader}>
                            {column.header}
                        </Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {items.map(renderItem)}
            </Table.Tbody>
        </Table>
    );


    function renderItem(item : Item) : React.ReactNode
    {
        return (
            <Table.Tr key={item.itemId} className={classes.itemRow}>
                {columns.map((column, index) => (
                    <Table.Td key={index} className={classes.itemData}>
                        {column.viewer(item)}
                    </Table.Td>
                ))}
            </Table.Tr>
        );
    }
}