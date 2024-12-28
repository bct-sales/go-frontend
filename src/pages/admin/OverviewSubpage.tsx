import { getItemCountsPerCategory, ItemCountByCategory } from "@/rest/item-counts";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";

export default function OverviewSubpage() : React.ReactNode
{
    const [categoryCounts, setCategoryCounts] = useState<ItemCountByCategory[] | undefined>(undefined);

    useEffect(() => {
        void (async () => {
            const data = await getItemCountsPerCategory();

            if (data !== undefined)
            {
                setCategoryCounts(data.counts);
            }
            else
            {
                console.log(`Failed to get category counts`);
                // TODO handle error
            }
        })();
    }, []);

    return (
        <>
            {renderCategoryCounts()}
        </>
    );


    function renderCategoryCounts() : React.ReactNode
    {
        if (categoryCounts === undefined)
        {
            return <div>Loading...</div>;
        }

        return (
            <Table>
                <Table.Thead>
                    <Table.Tr>
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
    }

    function renderCategoryCount(itemCount : ItemCountByCategory) : React.ReactNode
    {
        return (
            <Table.Tr key={itemCount.category_id}>
                <Table.Td>{itemCount.category_id}</Table.Td>
                <Table.Td>{itemCount.category_name}</Table.Td>
                <Table.Td>{itemCount.count}</Table.Td>
            </Table.Tr>
        );
    }

    function renderTotalCountRow() : React.ReactNode
    {
        if ( categoryCounts )
        {
            const total = categoryCounts.reduce((acc, curr) => acc + curr.count, 0);

            return (
                <Table.Tr>
                    <Table.Td></Table.Td>
                    <Table.Td>Total</Table.Td>
                    <Table.Td>{total}</Table.Td>
                </Table.Tr>
            );
        }
        else
        {
            return <></>;
        }
    }
}
