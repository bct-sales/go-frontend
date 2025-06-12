import CaptionedBox from "@/components/CaptionedBox";
import Price from "@/components/Price";
import SaleItemsTable, { SaleItem } from "@/components/SaleItemsTable";
import { getItemInformation, Item } from "@/rest/item-data";
import { ActionIcon, Button, Flex, Group, Stack, Stepper, TextInput, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBackspace, IconCheck, IconCurrencyEuro, IconPlus, IconShoppingBag } from "@tabler/icons-react";
import { useRef, useState } from "react";
import classes from './AddSalePage.module.css';
import { addSale } from "@/rest/add-sale";


interface Props
{
    cashierId: number;
}

export default function AddSalePage(props: Props): React.ReactNode
{
    const [step, setStep] = useState(0);
    const [saleItems, setSaleItems] = useState<Item[]>([]);
    const [itemId, setItemId] = useState<string>("");
    const itemInputRef = useRef<HTMLInputElement>(null);
    const canFinalizeSale = saleItems.length > 0;
    const totalPriceInCents = saleItems.reduce((total, item) => total + item.priceInCents, 0);

    return (
        <Stepper active={step}>
            <Stepper.Step label="Items" description="Add items to the sale" icon={<IconShoppingBag />} p='xl'>
                <Stack>
                    <CaptionedBox caption="Add Item">
                        <Stack align="center">
                            <Group >
                                <TextInput value={itemId} ref={itemInputRef} onChange={e => onUpdateItemId(e.currentTarget.value)} onKeyDown={onKeyDownInItemIdInput} classNames={{input: classes.itemIdInput}} />
                                <ActionIcon onClick={onAddItem} disabled={!isValidItemId(itemId)}>
                                    <IconPlus />
                                </ActionIcon>
                            </Group>
                        </Stack>
                    </CaptionedBox>
                    <Button onClick={onFinalizeSale} disabled={!canFinalizeSale} mb='xl'>
                        Finalize Sale
                    </Button>
                    <CaptionedBox caption="Sale Items">
                        {renderSaleItems()}
                    </CaptionedBox>
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Payment" description="Finalize the sale" icon={<IconCurrencyEuro />} allowStepSelect={canFinalizeSale} p='xl'>
                <Stack>
                    <CaptionedBox caption="Amount Due">
                        <Stack align="center">
                            <Price priceInCents={totalPriceInCents} className={classes.totalPrice} />
                            <Group justify="space-between" w="100%">
                                <Button leftSection={<IconBackspace />} onClick={() => setStep(0)} variant="outline">
                                    Back to Items
                                </Button>
                                <Tooltip label="Press this button after receiving payment">
                                    <Button leftSection={<IconCheck />} color="green" onClick={onPaymentReceived}>
                                        Payment Received
                                    </Button>
                                </Tooltip>
                            </Group>
                        </Stack>
                    </CaptionedBox>
                </Stack>
            </Stepper.Step>
        </Stepper>

    );


    function convertToSaleItem(item: Item): SaleItem
    {
        return {
            itemId: item.itemId,
            description: item.description,
            priceInCents: item.priceInCents,
            alreadySold: item.soldIn.length > 0,
        };
    }

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
        setStep(1);
    }

    function isValidItemId(value: string): boolean
    {
        const itemId = parseInt(value, 10);

        return !isNaN(itemId) && itemId > 0;
    }

    function onKeyDownInItemIdInput(event: React.KeyboardEvent<HTMLInputElement>): void
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

    function removeItemWithIndex(index: number): void
    {
        const updatedItems = saleItems.filter((_, i) => i !== index);
        setSaleItems(updatedItems);
    }

    function removeAllSaleItems(): void
    {
        setSaleItems([]);
    }

    function renderSaleItems(): React.ReactNode
    {
        if ( saleItems.length === 0 )
        {
            return (
                <>
                    No items have been added yet
                </>
            );
        }
        else
        {
            return (
                <>
                    <Flex direction="row" justify="flex-end">
                        <Button color="red" onClick={removeAllSaleItems} tabIndex={-1}>
                            Remove All
                        </Button>
                    </Flex>
                    <SaleItemsTable items={saleItems.map(convertToSaleItem)} onRemoveItem={removeItemWithIndex} />
                </>
            );
        }
    }

    async function onPaymentReceived(): Promise<void>
    {
        const itemIds = saleItems.map(item => item.itemId);
        const result = await addSale({ itemIds });

        if ( result.success )
        {
            notifications.show({
                message: `Sale completed successfully`,
                color: 'green',
            });

            removeAllSaleItems();
            setStep(0);
        }
        else
        {
            notifications.show({
                message: `Failed to complete sale`,
                color: 'red',
            });

            console.error(result.error);
        }
    }
}