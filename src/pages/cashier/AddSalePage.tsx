import CaptionedBox from "@/components/CaptionedBox";
import Price from "@/components/Price";
import SaleItemsTable, { SaleItem } from "@/components/SaleItemsTable";
import { getItemInformation, Item } from "@/rest/item-data";
import { ActionIcon, Button, Flex, Group, Stack, Stepper, TextInput, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBackspace, IconCheck, IconCurrencyEuro, IconPlus, IconShoppingBag } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import classes from './AddSalePage.module.css';
import { addSale } from "@/rest/add-sale";
import { useHotkeys } from "@mantine/hooks";
import { ActiveSoundEmitter, MuteSoundEmitter } from "@/sound";
import { useSettings } from "@/settings";


export default function AddSalePage(): React.ReactNode
{
    const [step, setStep] = useState(0);
    const [saleItems, setSaleItems] = useState<Item[]>([]);
    const [itemId, setItemId] = useState<string>("");
    const itemInputRef = useRef<HTMLInputElement>(null);
    const settings = useSettings();
    const soundEmitter = useRef(new MuteSoundEmitter());

    useEffect(() => {
        if ( settings.cashierSounds )
        {
            soundEmitter.current = new ActiveSoundEmitter();
        }
    }, [settings.cashierSounds]);

    useHotkeys([
        [
            'Ctrl+Alt+Enter',
            () => {
                if ( step === 1 )
                {
                    onPaymentReceived();
                }
            }
        ],
    ])
    useEffect(() => {
        itemInputRef.current?.focus();
    }, [step]);

    const canAddItem = isValidItemId(itemId);
    const canFinalizeSale = saleItems.length > 0 && itemId.length === 0;
    const totalPriceInCents = saleItems.reduce((total, item) => total + item.priceInCents, 0);

    return (
        <Stepper active={step}>
            <Stepper.Step label="Step 1" description="Add items to the sale" icon={<IconShoppingBag />} p='xl'>
                <Stack>
                    <CaptionedBox caption="Add Item">
                        <Stack align="center">
                            <Group >
                                <TextInput value={itemId} ref={itemInputRef} onChange={e => onUpdateItemId(e.currentTarget.value)} onKeyDown={onKeyDownInItemIdInput} classNames={{input: classes.itemIdInput}} />
                                <Tooltip label="Adds item to the sale (shortcut: Enter while in textbox)">
                                    <ActionIcon onClick={onAddItem} disabled={!canAddItem}>
                                        <IconPlus />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Stack>
                    </CaptionedBox>
                    <Tooltip label="Press this button after all items have been added (shortcut: Ctrl+Enter while in textbox)">
                        <Button onClick={onFinalizeSale} disabled={!canFinalizeSale} mb='xl'>
                            Finalize Sale
                        </Button>
                    </Tooltip>
                    <CaptionedBox caption="Sale Items">
                        {renderSaleItems()}
                    </CaptionedBox>
                </Stack>
            </Stepper.Step>
            <Stepper.Step label="Step 2" description="Finalize the sale" icon={<IconCurrencyEuro />} allowStepSelect={canFinalizeSale} p='xl'>
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

    /*
        Called when an item id has been entered and needs to be added to the sale.
        The item id has not been checked yet at this point.
    */
    async function onAddItem(): Promise<void>
    {
        if ( canAddItem )
        {
            const itemIdNumber = parseInt(itemId, 10);

            if ( !isNaN(itemIdNumber) )
            {
                if ( saleItems.some(item => item.itemId === itemIdNumber) )
                {
                    onItemAddedAlreadyInSale();
                    return;
                }

                const result = await getItemInformation(itemIdNumber);

                if ( result.success )
                {
                    const itemInformation = result.value;
                    const updatedSaleItems = [itemInformation, ...saleItems];
                    setSaleItems(updatedSaleItems);
                    resetItemInput();

                    if ( itemInformation.soldIn.length === 0 )
                    {
                        soundEmitter.current.success();
                    }
                    else
                    {
                        soundEmitter.current.warning();
                    }
                }
                else
                {
                    notifications.show({
                        message: `Unknown item`,
                        color: 'red',
                    });
                    soundEmitter.current.error();
                }
            }
            else
            {
                // This should never happen, button should be disabled if itemId is not a valid number
                notifications.show({
                    message: `Invalid item ID`,
                    color: 'red',
                });
                soundEmitter.current.error();
            }
        }
    }

    /*
        Called when the user tried to add an item that is already included in the current sale.
    */
    function onItemAddedAlreadyInSale()
    {
        notifications.show({
            message: `Item already in sale`,
            color: 'red',
        });

        resetItemInput();
        soundEmitter.current.error();
    }

    function onFinalizeSale(): void
    {
        if ( canFinalizeSale )
        {
            setStep(1);
        }
    }

    function isValidItemId(value: string): boolean
    {
        const itemId = parseInt(value, 10);

        return !isNaN(itemId) && itemId > 0;
    }

    function onKeyDownInItemIdInput(event: React.KeyboardEvent<HTMLInputElement>): void
    {
        if ( event.key === 'Enter' )
        {
            event.preventDefault();

            if ( event.ctrlKey )
            {
                if ( !event.altKey )
                {
                    onFinalizeSale();
                }
            }
            else
            {
                onAddItem();
            }
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