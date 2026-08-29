import { Consumable, useConsumables } from '@/consumables';
import { Button, Group, Table } from '@mantine/core';
import React from 'react';
import classes from './ConsumablesViewer.module.css';
import { range } from '@/util';


interface Props
{
    onAddItem: (itemId: number) => void;
}

export default function ActualConsumablesViewer(props: Props): React.ReactElement
{
    const consumables = useConsumables();

    return (
        <Table>
            <Table.Tbody>
                {renderRows()}
            </Table.Tbody>
        </Table>
    );


    function renderRows(): React.ReactNode
    {
        return consumables.map(renderRow);
    }

    function renderRow(consumable: Consumable): React.ReactElement
    {
        return (
            <Table.Tr>
                <Table.Td className={classes.itemDescription}>
                    {consumable.name}
                </Table.Td>
                <Table.Td className={classes.quantities}>
                    {renderQuantityButtons(consumable)}
                </Table.Td>
            </Table.Tr>
        );
    }

    function renderQuantityButtons(consumable: Consumable): React.ReactElement
    {
        const quantities = range(1, 6);

        return (
            <Group justify="flex-end">
                {quantities.map(q => renderQuantityButton(consumable, q))}
            </Group>
        );
    }

    function renderQuantityButton(consumable: Consumable, quantity: number): React.ReactElement
    {
        return (
            <Button size="sm" onClick={() => onQuantityClicked(consumable, quantity)} key={quantity}>
                {quantity}
            </Button>
        );
    }

    function onQuantityClicked(consumable: Consumable, quantity: number): void
    {
        const itemIds = consumable.translateQuantityToItemIds(quantity);
        itemIds.reverse();

        for ( const itemId of itemIds )
        {
            props.onAddItem(itemId);
        }
    }
}