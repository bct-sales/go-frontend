import { DateTime } from "@/datetime";
import { Table } from "@mantine/core";
import CharityViewer from "./CharityViewer";
import DateTimeViewer from "./DateTimeViewer";
import DonationViewer from "./DonationViewer";
import classes from './ItemsTable.module.css';
import Price from "./Price";
import UserIdViewer from "./UserIdViewer";

interface Props
{
    items: Item[];
}

interface Item
{
    itemId: number;
    addedAt: DateTime;
    description: string;
    priceInCents: number,
    categoryId: number;
    sellerId: number;
    donation: boolean;
    charity: boolean;
}

export default function ItemsTable(props : Props) : React.ReactNode
{
    const { items } = props;

    return (
        <Table className={classes.itemTable}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Added At</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Category</Table.Th>
                    <Table.Th>Seller</Table.Th>
                    <Table.Th>Donation</Table.Th>
                    <Table.Th>Charity</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {items.map(renderItem)}
            </Table.Tbody>
        </Table>
    );


    function renderItem(item : Item) : React.ReactNode
    {
        return (
            <Table.Tr key={item.itemId} className={classes.itemRow}>
                <Table.Td className={classes.itemData}>
                    {item.itemId}
                </Table.Td>
                <Table.Td className={`${classes.itemData} ${classes.itemDescription}`}>
                    {item.description}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <DateTimeViewer dateTime={item.addedAt} />
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <Price priceInCents={item.priceInCents} />
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.categoryId}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <UserIdViewer userId={item.sellerId} />
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <DonationViewer value={item.donation} />
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <CharityViewer value={item.charity} />
                </Table.Td>
            </Table.Tr>
        );
    }
}