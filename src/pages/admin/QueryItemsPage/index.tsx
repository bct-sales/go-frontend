import CaptionedBox from '@/components/CaptionedBox';
import ItemsTable from '@/components/ItemsTable';
import { ActionIcon, Center, Group, Stack, TextInput, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { categoryColumn, deleteColumn, descriptionColumn, donationColumn, itemIdColumn, largeColumn, priceInCentsColumn, sellerColumn } from '@/components/ItemsTable/columns';
import { getItemInformation, Item as RestItem } from '@/rest/item-data';
import { notifications } from '@mantine/notifications';
import { Item } from '@/components/ItemsTable/ItemsTable';


export default function QueryItemsPage() : React.ReactElement
{
    const itemInputRef = useRef<HTMLInputElement>(null);
    const [itemIdString, setItemIdString] = useState<string>('');
    const [items, setItems] = useState<RestItem[]>([]);

    useEffect(() => {
        itemInputRef.current?.focus();
    }, []);

    const columns = [
        deleteColumn(onDeleteItem),
        itemIdColumn,
        descriptionColumn,
        sellerColumn,
        categoryColumn,
        priceInCentsColumn,
        largeColumn,
        donationColumn,
    ];

    return (
        <Stack align="center">
            <Center>
                <CaptionedBox caption="Add Item">
                    <Stack align="center">
                        <Group>
                            <TextInput ref={itemInputRef} onChange={e => onUpdateItemId(e.currentTarget.value)} onKeyDown={onKeyDownInItemIdInput} value={itemIdString} />
                            <Tooltip label="Adds item to the list">
                                <ActionIcon  onClick={onAddItem}>
                                    <IconPlus />
                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Stack>
                </CaptionedBox>
            </Center>
            <ItemsTable items={items} columns={columns} />
        </Stack>
    );


    function onUpdateItemId(value: string): void
    {
        if ( value.toLocaleLowerCase().endsWith('x') )
        {
            setItemIdString(value.slice(0, -1));
            onAddItem();
        }
        else
        {
            setItemIdString(value);
        }
    }

    function onKeyDownInItemIdInput(event: React.KeyboardEvent<HTMLInputElement>): void
    {
        if ( event.key === 'Enter' )
        {
            event.preventDefault();

            onAddItem();
        }
    }

    function onAddItem()
    {
        if ( !/\d+/.test(itemIdString) )
        {
            notifications.show({
                title: 'Invalid input',
                message: 'Invalid item id',
                color: 'red',
            });

            return;
        }

        const itemId = parseInt(itemIdString, 10);

        if ( items.some(item => item.itemId === itemId) )
        {
            notifications.show({
                title: 'Invalid input',
                message: 'Item already in list',
                color: 'red',
            });
            setItemIdString('');

            return;
        }

        (async () => {
            const response = await getItemInformation(itemId);
            if ( response.success )
            {
                setItems([response.value, ...items]);
                setItemIdString('');
            }
            else
            {
                notifications.show({
                    title: 'Invalid input',
                    message: 'Unknown item id',
                    color: 'red',
                });
            }
        })();
    }

    function onDeleteItem(itemToBeDeleted: Item): void
    {
        const updatedItems = items.filter(item => item.itemId !== itemToBeDeleted.itemId);

        setItems(updatedItems);
    }
}
