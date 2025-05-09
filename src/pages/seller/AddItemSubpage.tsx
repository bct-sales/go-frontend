import AdvancedOnly from "@/components/AdvancedOnly";
import HelpPopover from "@/components/HelpPopover";
import ItemEditor, { ItemData } from "@/components/ItemEditor";
import { addItem, Payload } from "@/rest/add-item";
import { validateDescription, validatePrice } from "@/validation";
import { Button, Flex, Group, Switch, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface Props
{
    sellerId: number;
}

export default function AddItemPage(props: Props) : React.ReactNode
{
    const navigate = useNavigate();
    const [itemData, setItemData] = useState<ItemData>({description: '', priceInCents: 50, categoryId: null, charity: false, donation: false});
    const [addMultiple, setAddMultiple] = useState(false);
    const { description, priceInCents, categoryId, charity, donation } = itemData;
    const isValidData = checkValidity();

    return (
        <Flex direction="column" align="stretch" justify="center" gap='md'>
            <ItemEditor itemData={itemData} setItemData={setItemData} />
            <Button mt='xl' onClick={onAddItem} disabled={!isValidData}>Add Item</Button>
            <AdvancedOnly>
                <Group justify="flex-end">
                    <Switch label="Add multiple" checked={addMultiple} onChange={e => setAddMultiple(e.currentTarget.checked)} />
                    <HelpPopover>
                        <Text size="sm">
                            If enabled, pressing "Add Item" will add the item and reset the form, allowing you to add another item without going back to the item overview page.
                        </Text>
                    </HelpPopover>
                </Group>
            </AdvancedOnly>
        </Flex>
    );


    function onAddItem(): void
    {
        void (async () => {
            const payload: Payload = {
                description,
                priceInCents,
                categoryId: categoryId!,
                charity,
                donation,
            };

            const response = await addItem(props.sellerId, payload);

            if ( response.success )
            {
                notifications.show({
                    message: `Item successfully added!`,
                    color: 'green',
                });

                if ( addMultiple )
                {
                    resetItemData();
                }
                else
                {
                    navigate('/seller');
                }
            }
            else
            {
                notifications.show({
                    title: 'Failed to add item',
                    message: `${response.error.details} (tag ${response.error.type})`,
                    color: 'red',
                });
            }
        })();
    }

    function checkValidity(): boolean
    {
        if ( !validateDescription(description).isValid )
        {
            return false;
        }

        if ( !validatePrice(priceInCents).isValid )
        {
            return false;
        }

        if ( categoryId === undefined )
        {
            return false;
        }

        return true;
    }

    function resetItemData(): void
    {
        setItemData({
            description: '',
            priceInCents: 50,
            categoryId: null,
            charity: false,
            donation: false,
        });
    }
}
