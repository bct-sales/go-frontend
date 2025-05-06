import Loading from "@/components/Loading";
import Price from "@/components/Price";
import { getSellerSummary, SellerSummary } from "@/rest/seller-summary";
import { RestStatus } from "@/rest/status";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";


interface Props
{
    sellerId: number;
}

export default function OverviewSubpage(props: Props) : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<SellerSummary>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            const response = await getSellerSummary(props.sellerId);

            if (response.success)
            {
                setStatus({ status: 'success', value: response.value });
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
                <Loading message="Fetching summary data..." />
            );

        case 'error':
            return <div>Error: {status.details}</div>;
    }


    function renderPage(summary: SellerSummary): React.ReactNode
    {
        return (
            <Table variant="vertical">
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>Seller ID</Table.Th>
                        <Table.Td>{props.sellerId}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Item Count</Table.Th>
                        <Table.Td>{summary.itemCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Frozen Item Count</Table.Th>
                        <Table.Td>{summary.frozenItemCount}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Total Item's Worth</Table.Th>
                        <Table.Td><Price priceInCents={summary.totalPrice} /></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        );
    }
}
