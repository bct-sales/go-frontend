import ItemsTable from "@/components/ItemsTable";
import { addedAtColumn, categoryColumn, charityColumn, descriptionColumn, donationColumn, editColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import Loading from "@/components/Loading";
import { generateLabels } from "@/rest/generate-labels";
import { Item, listSellerItems } from "@/rest/list-seller-items";
import { RestStatus } from "@/rest/status";
import { Button, Flex, Stack } from "@mantine/core";
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
                <ItemsTable items={items} columns={columns} />
            </Stack>
        );
    }

    function onGenerateLabels(): void
    {
        void (async () => {
            const blob = await generateLabels(props.sellerId);

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

    function onEditItem(item: Item): void
    {
        console.log(`Editing item ${item.itemId}`);
    }
}
