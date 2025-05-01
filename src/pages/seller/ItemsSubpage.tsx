import ItemsTable from "@/components/ItemsTable";
import Loading from "@/components/Loading";
import { Item, listSellerItems } from "@/rest/list-seller-items";
import { RestStatus } from "@/rest/status";
import { Flex, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
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
                    <IconPlus />
                </Flex>
                <ItemsTable items={items} />
            </Stack>
        );
    }
}
