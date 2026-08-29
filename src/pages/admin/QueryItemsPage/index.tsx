import CaptionedBox from "@/components/CaptionedBox";
import ItemsTable from "@/components/ItemsTable";
import { ActionIcon, Center, Group, Stack, TextInput, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { categoryColumn, descriptionColumn, donationColumn, itemIdColumn, largeColumn, priceInCentsColumn, sellerColumn } from "@/components/ItemsTable/columns";
import { getItemInformation, Item } from "@/rest/item-data";
import { notifications } from "@mantine/notifications";


export default function QueryItemsPage() : React.ReactElement
{
    const itemInputRef = useRef<HTMLInputElement>(null);
    const [itemIdString, setItemIdString] = useState<string>("");
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
            itemInputRef.current?.focus();
        }, []);

    const columns = [
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
        if ( value.toLocaleLowerCase().endsWith("x") )
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
            })

            return
        }

        const itemId = parseInt(itemIdString, 10);

        (async () => {
            const response = await getItemInformation(itemId);
            if ( response.success )
            {
                setItems([...items, response.value]);
                setItemIdString("");
            }
            else
            {
                notifications.show({
                    title: 'Invalid input',
                    message: 'Unknown item id',
                    color: 'red',
                });
            }
        })()
    }
}
