import ItemsTable from "@/components/ItemsTable";
import { addedAtColumn, categoryColumn, copyColumn, descriptionColumn, donationColumn, editColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import { Column } from "@/components/ItemsTable/ItemsTable";
import Loading from "@/components/Loading";
import { addItem } from "@/rest/add-item";
import { Item, listSellerItems } from "@/rest/list-seller-items";
import { RestStatus } from "@/rest/status";
import { useSettings } from "@/settings";
import { Flex, ScrollArea, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItemButton from "./AddItemButton";


interface Props
{
    sellerId: number;
}

export default function ItemsPage(props: Props) : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<Item[]>>({ status: 'loading' });
    const settings = useSettings();
    const navigate = useNavigate();
    const columns = determineColumns();

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
    }, [props.sellerId]);

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
                <Flex direction='row' justify='flex-end'>
                    <AddItemButton />
                </Flex>
                <ScrollArea style={{ height: 'calc(80vh)' }} scrollbars="y">
                    <ItemsTable items={items} columns={columns} />
                </ScrollArea>
            </Stack>
        );
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

    function determineColumns(): Column[]
    {
        if ( settings.advancedMode )
        {
            return [
                editColumn(onEditItem),
                copyColumn(onCopyItem),
                itemIdColumn,
                descriptionColumn,
                addedAtColumn,
                categoryColumn,
                priceInCentsColumn,
                donationColumn,
            ];
        }
        else
        {
            return [
                editColumn(onEditItem),
                itemIdColumn,
                descriptionColumn,
                addedAtColumn,
                categoryColumn,
                priceInCentsColumn,
                donationColumn,
            ];
        }
    }
}
