import { Table } from "@mantine/core";
import React from "react";
import classes from './SaleItemsTable.module.css';
import Price from "./Price";


interface Props
{
    items: SaleItem[];
}

export interface SaleItem
{
    itemId: number;
    description: string;
    priceInCents: number,
    alreadySold: boolean;
}

export default function ItemsTable(props: Props): React.ReactNode
{
    const { items } = props;

    return (
        <Table className={classes.itemTable}>
            <Table.Thead>
                <Table.Tr className={classes.itemHeaderRow}>
                    <Table.Th>
                        Id
                    </Table.Th>
                    <Table.Th>
                        Description
                    </Table.Th>
                    <Table.Th>
                        Price
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {items.map(renderItem)}
            </Table.Tbody>
        </Table>
    );


    function renderItem(item: SaleItem): React.ReactNode
    {
        return (
            <Table.Tr key={item.itemId} className={rowClassNameFor(item)}>
                <Table.Td>
                    {item.itemId}
                </Table.Td>
                <Table.Td className={classes.itemDescription}>
                    {item.description}
                </Table.Td>
                <Table.Td>
                    <Price priceInCents={item.priceInCents} />
                </Table.Td>
            </Table.Tr>
        );
    }

    function rowClassNameFor(item: SaleItem): string
    {
        const classNames = [ classes.itemRow ];

        if ( item.alreadySold ) {
            classNames.push(classes.alreadySold);
        }

        return classNames.join(' ');
    }
}