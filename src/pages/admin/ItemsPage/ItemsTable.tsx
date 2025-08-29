import CategoryViewer from "@/components/CategoryViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { DateTime } from "@/datetime";
import { Flex } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import classes from './ItemsTable.module.css';

export interface Item
{
    itemId: number;
    addedAt: DateTime;
    description: string;
    priceInCents: number,
    categoryId: number;
    sellerId: number;
    donation: boolean;
    charity: boolean;
    frozen: boolean;
}

interface Props
{
    items: Item[];
}

export default function ItemsPage(props: Props): React.ReactNode
{
    return (
        <DataTable
            className={classes.table}
            striped
            highlightOnHover
            records={props.items}
            height="calc(100vh - 300px)"
            columns={[
                {
                    accessor: 'itemId',
                    title: 'Id',
                    cellsClassName: classes.idColumn,
                },
                {
                    accessor: 'sellerId',
                    title: 'Seller',
                    render: (item: Item) => <UserIdViewer userId={item.sellerId} />,
                    cellsClassName: classes.sellerColumn,

                },
                {
                    accessor: 'description',
                    title: 'Description',
                    cellsClassName: classes.descriptionColumn,
                },
                {
                    accessor: 'addedAt',
                    title: 'Added At',
                    render: (item: Item) => <DateTimeViewer dateTime={item.addedAt} />,
                },
                {
                    accessor: 'priceInCents',
                    title: 'Price',
                    render: (item: Item) => <Flex justify='flex-end'><Price priceInCents={item.priceInCents} /></Flex>,
                    cellsClassName: classes.priceColumn,
                },
                {
                    accessor: 'categoryId',
                    title: 'Category',
                    render: (item: Item) => <CategoryViewer categoryId={item.categoryId} />,
                    cellsClassName: classes.categoryColumn,
                },
                {
                    accessor: 'donation',
                    title: '',
                    render: (item: Item) => <DonationViewer value={item.donation} />,
                    cellsClassName: classes.donationColumn,
                },
            ]}
        />
    );
}