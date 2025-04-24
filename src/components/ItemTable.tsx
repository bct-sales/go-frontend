import { Table } from "@mantine/core";
import classes from './ItemTable.module.css'
import Price from "./Price";
import DateTime from "./DateTime";

interface Props
{
    items: Item[];
}

interface Item
{
    item_id: number;
    added_at: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    description: string;
    price_in_cents: number,
    category_id: number;
    seller_id: number;
    donation: boolean;
    charity: boolean;
}

export default function ItemTable(props : Props) : React.ReactNode
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
            <Table.Tr key={item.item_id} className={classes.itemRow}>
                <Table.Td className={classes.itemData}>
                    {item.item_id}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.description}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <DateTime dateTime={item.added_at} />
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    <Price priceInCents={item.price_in_cents} />
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.category_id}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.seller_id}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.donation}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.charity}
                </Table.Td>
            </Table.Tr>
        );
    }
}