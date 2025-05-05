import ItemEditor, { ItemData } from "@/components/ItemEditor";
import { getItemInformation, Item } from "@/rest/item-data";
import { RestStatus } from "@/rest/status";
import { updateItem } from "@/rest/update-item";
import { Button, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


interface Props
{
    sellerId: number;
}

export default function EditItemSubpage(props: Props) : React.ReactNode
{
    const [searchParams] = useSearchParams();
    const itemId = parseInt(searchParams.get('itemId') || '');
    const [originalData, setOriginalData] = useState<RestStatus<Item>>({ status: 'loading' });
    const [itemData, setItemData] = useState<ItemData>({
        description: '',
        priceInCents: 50,
        categoryId: undefined,
        charity: false,
        donation: false,
    });

    useEffect(() => {
        void (async () => {
            const item = await getItemInformation(itemId);

            if (item.success) {
                const { description, priceInCents, categoryId, charity, donation } = item.value;
                setOriginalData({ status: 'success', value: item.value });
                setItemData({ description, priceInCents, categoryId, charity, donation });
            } else {
                setOriginalData({ status: 'error', tag: item.error.type, details: item.error.details });
            }
        })();
    }, [itemId]);

    switch (originalData.status) {
        case 'success':
            return renderPage();

        case 'loading':
            return (
                <Flex direction="column" align="center" justify="center" gap='md'>
                    <div>Loading item...</div>
                </Flex>
            );

        case 'error':
            return (
                <Flex direction="column" align="center" justify="center" gap='md'>
                    <div>Error: {originalData.details}</div>
                </Flex>
            );
    }


    function renderPage(): React.ReactNode
    {
        return (
            <Flex direction="column" align="stretch" justify="center" gap='md'>
                <ItemEditor itemData={itemData} setItemData={setItemData} />
                <Button mt='xl' onClick={onUpdateItem} disabled={!isValidData()}>Update Item</Button>
            </Flex>
        );
    }

    function onUpdateItem(): void
    {
        void (async () => {
            const payload = {
                description: itemData.description,
                priceInCents: itemData.priceInCents,
                categoryId: itemData.categoryId!,
                charity: itemData.charity,
                donation: itemData.donation,
            };

            const response = await updateItem(itemId, payload);

            if (response.success) {
                notifications.show({
                    message: `Item successfully updated!`,
                    color: 'green',
                });
            } else {
                notifications.show({
                    title: 'Failed to update item',
                    message: `${response.error.details} (tag ${response.error.type})`,
                    color: 'red',
                });
            }
        })();
    }

    function isValidData(): boolean
    {
        return itemData.description.length > 0 && itemData.priceInCents > 0 && itemData.categoryId !== undefined;
    }
}
