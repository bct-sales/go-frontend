import CaptionedBox from "@/components/CaptionedBox";
import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Loading from "@/components/Loading";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { getSaleInformation, Item, Sale, SuccessResponse } from "@/rest/sale-information";
import { RestStatus } from "@/rest/status";
import { Table } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function SalePage()
{
    const { saleId: saleIdString } = useParams<{ saleId: string }>();
    const [saleStatus, setSaleStatus] = useState<RestStatus<SuccessResponse>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            if ( !saleIdString || !/^\d+$/.test(saleIdString) )
            {
                setSaleStatus({ status: 'error', tag: 'invalid_user_id', details: 'Invalid user ID' });
                return;
            }

            const saleId = parseInt(saleIdString);

            if ( isNaN(saleId) )
            {
                // Should not happen due to regex check, but just in case
                setSaleStatus({ status: 'error', tag: 'invalid_user_id', details: 'Invalid user ID' });
                return;
            }

            const response = await getSaleInformation(saleId);

            if (response.success)
            {
                setSaleStatus({ status: 'success', value: response.value });
            }
            else
            {
                setSaleStatus({ status: 'error', tag: response.error.type, details: response.error.details });
            }
        })();
    }, [saleIdString]);

    switch (saleStatus.status)
    {
        case 'error':
            return (
                <div>Error: {saleStatus.tag} - {saleStatus.details}</div>
            );

        case 'loading':
            return (
                <Loading message="Loading sale information..." />
            );

        case 'success':
            return renderPage(saleStatus.value);
    }


    function renderPage(saleInformation: SuccessResponse): React.ReactNode
    {
        return (
            <>
                <CaptionedBox caption="Sale Information">
                    {renderSaleInformation(saleInformation)}
                </CaptionedBox>
                <CaptionedBox caption="Items">
                    {renderItemTable(saleInformation.items)}
                </CaptionedBox>
            </>
        );
    }

    function renderSaleInformation(sale: Sale): React.ReactNode
    {
        const total = sale.items.reduce((sum, item) => sum + item.priceInCents, 0);

        return (
            <Table variant="vertical">
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>Sale ID</Table.Th>
                        <Table.Td>{sale.saleId}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Cashier ID</Table.Th>
                        <Table.Td><UserIdViewer userId={sale.cashierId} /></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Transaction Time</Table.Th>
                        <Table.Td><DateTimeViewer dateTime={sale.transactionTime} /></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Item Count</Table.Th>
                        <Table.Td>{sale.items.length}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Total</Table.Th>
                        <Table.Td><Price priceInCents={total} /></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        );
    }

    function renderItemTable(items: Item[]): React.ReactNode
    {
        return (
            <DataTable
                striped
                records={items}
                columns={[
                    {
                        accessor: 'itemId',
                        title: "Id",
                    },
                    {
                        accessor: 'description',
                        title: "Description",
                    },
                    {
                        accessor: 'categoryId',
                        title: "Category",
                        render: item => <CategoryViewer categoryId={item.categoryId} />,
                    },
                    {
                        accessor: 'priceInCents',
                        title: "Price",
                        render: item => <Price priceInCents={item.priceInCents} />,
                    },
                    {
                        accessor: 'charity',
                        title: "Charity",
                        render: item => <CharityViewer value={item.charity} />,
                    },
                    {
                        accessor: 'donation',
                        title: "Donation",
                        render: item => <DonationViewer value={item.charity} />,
                    },
                    {
                        accessor: 'addedAt',
                        title: "Added At",
                        render: item => <DateTimeViewer dateTime={item.addedAt} />,
                    },
                ]}
            />
        );
    }
}
