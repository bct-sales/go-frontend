import { DateTime } from "@/datetime";
import { Button, Table } from "@mantine/core";
import CharityViewer from "./CharityViewer";
import DateTimeViewer from "./DateTimeViewer";
import DonationViewer from "./DonationViewer";
import classes from './ItemsTable.module.css';
import Price from "./Price";
import UserIdViewer from "./UserIdViewer";
import { useCategories } from "@/categories";
import Loading from "./Loading";
import FrozenViewer from "./FrozenViewer";
import { IconEdit } from "@tabler/icons-react";

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
    frozen: boolean;
}

export default function ItemsTable(props : Props) : React.ReactNode
{
    const { items } = props;
    const categoryTable = useCategories();

    return (
        <Table className={classes.itemTable}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
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
                    {renderEditOrFrozen(item)}
                </Table.Td>
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
                    {renderCategory(item.categoryId)}
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

    function renderEditOrFrozen(item: Item): React.ReactNode
    {
        if ( item.frozen )
        {
            return <FrozenViewer value={item.frozen} />;
        }
        else
        {
            return (
                <Button variant="subtle" onClick={() => onEdit(item.itemId)}>
                    <IconEdit size={16} />
                </Button>
            );
        }
    }

    function renderCategory(categoryId: number): React.ReactNode
    {
        switch (categoryTable.status)
        {
            case 'loading':
                return <>Loading</>;
            case 'error':
                return <span>Error: {categoryTable.details}</span>;
            case 'success':
                return (
                    <>{categoryTable.value.categoryName(categoryId)}</>
                );
        }
    }

    function onEdit(itemId: number): void
    {
        console.log(`Edit item ${itemId}`);
    }
}