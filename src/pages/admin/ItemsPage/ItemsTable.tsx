import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Price from "@/components/Price";
import UserIdViewer from "@/components/UserIdViewer";
import { DateTime } from "@/datetime";
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
            striped
            highlightOnHover
            records={props.items}
            height="calc(100vh - 300px)"
            columns={[
                {
                    accessor: 'itemId',
                    title: 'Id',
                },
                {
                    accessor: 'description',
                    title: 'Description',
                    cellsClassName: classes.description,

                },
                {
                    accessor: 'addedAt',
                    title: 'Added At',
                    render: (item: Item) => <DateTimeViewer dateTime={item.addedAt} />,
                },
                {
                    accessor: 'priceInCents',
                    title: 'Price',
                    render: (item: Item) => <Price priceInCents={item.priceInCents} />,
                },
                {
                    accessor: 'categoryId',
                    title: 'Category',
                    render: (item: Item) => <CategoryViewer categoryId={item.categoryId} />,
                },
                {
                    accessor: 'charity',
                    title: 'Charity',
                    render: (item: Item) => <CharityViewer value={item.charity} />,
                },
                {
                    accessor: 'donation',
                    title: 'Donation',
                    render: (item: Item) => <DonationViewer value={item.donation} />,
                },
                {
                    accessor: 'sellerId',
                    title: 'Seller Id',
                    render: (item: Item) => <UserIdViewer userId={item.sellerId} />,
                },
            ]}
        />
    );
}