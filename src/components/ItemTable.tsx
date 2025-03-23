import { Table } from "@mantine/core";
import classes from './ItemTable.module.css'

interface Props
{
    items: Item[];
}

interface Item
{
    itemId: number;
    addedAt: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    description: string;
    priceInCents: number,
    categoryId: number;
    sellerId: number;
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
        const addedAt = `${item.addedAt.year}-${pad(2, item.addedAt.month)}-${pad(2, item.addedAt.day)} ${pad(2, item.addedAt.hour)}:${pad(2, item.addedAt.minute)}:${pad(2, item.addedAt.second)}`;

        return (
            <Table.Tr key={item.itemId} className={classes.itemRow}>
                <Table.Td className={classes.itemData}>
                    {item.itemId}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.description}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {addedAt}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.priceInCents / 100}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.categoryId}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.sellerId}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.donation}
                </Table.Td>
                <Table.Td className={classes.itemData}>
                    {item.charity}
                </Table.Td>
            </Table.Tr>
        );


        function pad(length : number, n : number)
        {
            return n.toString().padEnd(length, '0');
        }
    }
}