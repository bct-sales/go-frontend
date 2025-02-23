import { ItemCountByCategory } from "@/rest/item-counts";
import { Table } from "@mantine/core";
import classes from './CategoryCountsTable.module.css'


interface Props
{
    categoryCounts : ItemCountByCategory[];
}

export default function CategoryCountsTable(props : Props) : React.ReactNode
{
    const categoryCounts = props.categoryCounts;

    return (
        <Table>
            <Table.Thead>
                <Table.Tr className={classes.headerRow}>
                    <Table.Th>Category Id</Table.Th>
                    <Table.Th>Category Name</Table.Th>
                    <Table.Th>Count</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {categoryCounts.map(renderCategoryCount)}
                {renderTotalCountRow()}
            </Table.Tbody>
        </Table>
    );

    function renderCategoryCount(itemCount : ItemCountByCategory) : React.ReactNode
    {
        return (
            <Table.Tr key={itemCount.category_id} className={classes.categoryCountRow}>
                <Table.Td>{itemCount.category_id}</Table.Td>
                <Table.Td className={classes.categoryName}>{itemCount.category_name}</Table.Td>
                <Table.Td>{itemCount.count}</Table.Td>
            </Table.Tr>
        );
    }

    function renderTotalCountRow() : React.ReactNode
    {
        const total = categoryCounts.reduce((acc, curr) => acc + curr.count, 0);

        return (
            <Table.Tr className={classes.totalRow}>
                <Table.Td></Table.Td>
                <Table.Td className={classes.total}>Total</Table.Td>
                <Table.Td>{total}</Table.Td>
            </Table.Tr>
        );
    }
}