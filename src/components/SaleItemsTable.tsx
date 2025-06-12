import { ActionIcon, Stack, Table, Tooltip } from "@mantine/core";
import React from "react";
import classes from './SaleItemsTable.module.css';
import Price from "./Price";
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react";


interface Props
{
    items: SaleItem[];
    onRemoveItem?: (index: number) => void;
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
                    <Table.Th />
                    <Table.Th />
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {items.map(renderItem)}
            </Table.Tbody>
        </Table>
    );


    function renderItem(item: SaleItem, index: number): React.ReactNode
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
                <Table.Td className={classes.alertColumn}>
                    {renderRemoveButton(index)}
                </Table.Td>
                <Table.Td className={classes.alertColumn}>
                    {renderWarning(item)}
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

    function renderWarning(item: SaleItem): React.ReactNode
    {
        if ( item.alreadySold ) {
            return (
                <Stack align="center" justify="center">
                    <Tooltip label="This item has already been sold">
                        <IconAlertTriangle />
                    </Tooltip>
                </Stack>
            );
        }

        return null;
    }

    function renderRemoveButton(index: number): React.ReactNode
    {
        return (
            <Stack align="center" justify="center">
                <Tooltip label="Remove item from sale">
                    <ActionIcon onClick={() => notifyRemoveItemWithIndex(index)} color="red" variant="outline">
                        <IconTrash />
                    </ActionIcon>
                </Tooltip>
            </Stack>
        );
    }

    function notifyRemoveItemWithIndex(index: number): void
    {
        props.onRemoveItem?.(index);
    }
}
