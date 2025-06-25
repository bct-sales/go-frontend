import ItemEditor, { ItemData } from "@/pages/seller/ItemEditor";
import { addItem, Payload } from "@/rest/add-item";
import { validateDescription, validatePrice } from "@/validation";
import { Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";


interface Props
{
    sellerId: number;
}

export default function AddItemPage(props: Props) : React.ReactNode
{
    const [itemData, setItemData] = useState<ItemData>({description: '', priceInCents: 50, categoryId: null, charity: false, donation: false});
    const { description, priceInCents, categoryId, charity, donation } = itemData;
    const isValidData = checkValidity();

    return (
        <Flex direction="column" align="stretch" justify="center" gap='md'>
            <ItemEditor itemData={itemData} setItemData={setItemData} />
            <Button mt='xl' onClick={onAddItem} disabled={!isValidData}>Add Item</Button>
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

                resetItemData();
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
