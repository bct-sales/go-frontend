import ItemsTable from "@/components/ItemsTable";
import { addedAtColumn, categoryColumn, charityColumn, copyColumn, descriptionColumn, donationColumn, editColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import Loading from "@/components/Loading";
import { addItem } from "@/rest/add-item";
import { generateLabels } from "@/rest/generate-labels";
import { Item, listSellerItems } from "@/rest/list-seller-items";
import { RestStatus } from "@/rest/status";
import { Button, Flex, ScrollArea, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Props
{
    sellerId: number;
}

export default function ItemsSubpage(props: Props) : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<Item[]>>({ status: 'loading' });
    const navigate = useNavigate();
    const columns = [
        editColumn(onEditItem),
        copyColumn(onCopyItem),
        itemIdColumn,
        descriptionColumn,
        addedAtColumn,
        categoryColumn,
        priceInCentsColumn,
        charityColumn,
        donationColumn,
    ];

    useEffect(() => {
        void (async () => {
            const response = await listSellerItems(props.sellerId);

            if (response.success)
            {
                setStatus({ status: 'success', value: response.value.items });
            }
            else
            {
                setStatus({ status: 'error', tag: response.error.type, details: response.error.details });
            }
        })();
    }, [props.sellerId, navigate]);

    switch (status.status)
    {
        case 'success':
            return renderPage(status.value);

        case 'loading':
            return (
                <Loading message="Loading items..." />
            );

        case 'error':
            return <div>Error: {status.details}</div>;
    }


    function renderPage(items: Item[]): React.ReactNode
    {
        return (
            <Stack>
                <Flex justify="flex-end" align="center">
                    <Button onClick={onGenerateLabels} disabled={items.length === 0}>Generate</Button>
                </Flex>
                <ScrollArea style={{ height: 'calc(50vh)' }} scrollbars="y">
                    <ItemsTable items={items} columns={columns} />
                </ScrollArea>
            </Stack>
        );


        function onGenerateLabels(): void
        {
            void (async () => {
                const payload = { itemIds: items.map(item => item.itemId) };
                console.log(payload);
                const blob = await generateLabels(payload);

                if ( !blob.success )
                {
                    console.error("Failed to generate labels", blob.error);
                    return;
                }

                const url = window.URL.createObjectURL(blob.value);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'labels.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })();
        }
    }

    function onEditItem(item: Item): void
    {
        navigate(`/seller/edit-item?itemId=${item.itemId}`);
    }

    function onCopyItem(item: Item): void
    {
        void (async () => {
            const copyId = await addItem(props.sellerId, item);

            if ( copyId.success )
            {
                navigate(`/seller/edit-item?itemId=${copyId.value}`);
            }
            else
            {
                notifications.show({
                    title: 'Error',
                    message: `Failed to copy item: ${copyId.error.details}`,
                    color: 'red',
                });
            }
        })();
    }
}
