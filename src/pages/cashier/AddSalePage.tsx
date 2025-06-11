import CaptionedBox from "@/components/CaptionedBox";
import ItemsTable from "@/components/ItemsTable";
import { descriptionColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import { getItemInformation, Item } from "@/rest/item-data";
import { ActionIcon, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCashRegister, IconPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";


interface Props
{
    cashierId: number;
}

export default function AddSalePage(props: Props): React.ReactNode
{
    const [saleItems, setSaleItems] = useState<Item[]>([]);
    const [itemId, setItemId] = useState<string>("");
    const itemInputRef = useRef<HTMLInputElement>(null);

    return (
        <Stack>
            <CaptionedBox caption="Add Item">
                <Stack>
                    <TextInput value={itemId} ref={itemInputRef} onChange={e => onUpdateItemId(e.currentTarget.value)} onKeyDown={onKeyDown} />
                    <ActionIcon onClick={onAddItem} disabled={!isValidItemId(itemId)}><IconPlus /></ActionIcon>
                    <ActionIcon onClick={onFinalizeSale}><IconCashRegister /></ActionIcon>
                </Stack>
            </CaptionedBox>
            <ItemsTable items={saleItems} columns={[itemIdColumn, descriptionColumn, priceInCentsColumn]}></ItemsTable>
        </Stack>
    );


    function onUpdateItemId(value: string): void
    {
        if ( value.toLocaleLowerCase().endsWith("x") )
        {
            setItemId(value.slice(0, -1));
            onAddItem();
        }
        else
        {
            setItemId(value);
        }
    }

    async function onAddItem(): Promise<void>
    {
        const itemIdNumber = parseInt(itemId, 10);

        if ( !isNaN(itemIdNumber) )
        {
            if ( saleItems.some(item => item.itemId === itemIdNumber) )
            {
                notifications.show({
                    message: `Item already in sale`,
                    color: 'red',
                });

                resetItemInput();
                return;
            }

            const result = await getItemInformation(itemIdNumber);

            if ( result.success )
            {
                const itemInformation = result.value;
                const updatedSaleItems = [itemInformation, ...saleItems];
                setSaleItems(updatedSaleItems);
                resetItemInput();
            }
            else
            {
                notifications.show({
                    message: `Unknown item`,
                    color: 'red',
                });
            }
        }
        else
        {
            // This should never happen, button should be disabled if itemId is not a valid number
            notifications.show({
                message: `Invalid item ID`,
                color: 'red',
            });
        }
    }

    function onFinalizeSale(): void
    {
        setSaleItems([]);
    }

    function isValidItemId(value: string): boolean
    {
        const itemId = parseInt(value, 10);

        return !isNaN(itemId) && itemId > 0;
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void
    {
        if (event.key === 'Enter')
        {
            event.preventDefault();
            onAddItem();
        }
    }

    function resetItemInput(): void
    {
        setItemId("");
        itemInputRef.current?.focus();
    }
}
