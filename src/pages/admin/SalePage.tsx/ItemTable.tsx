import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Price from "@/components/Price";
import { Item } from "@/rest/sale-information";
import { DataTable } from "mantine-datatable";


interface Props
{
    items: Item[];
}

export default function ItemTable(props: Props): React.ReactNode
{
    const { items } = props;

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