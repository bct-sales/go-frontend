import { getItemCountsPerCategory } from "@/rest/item-counts";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";

export default function OverviewSubpage() : React.ReactNode
{
    const [categoryCounts, setCategoryCounts] = useState<Record<string, number> | undefined>(undefined);

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

        const categoryCountsArray = Object.entries(categoryCounts);

        return (
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Count</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {categoryCountsArray.map(([category, count]) => renderCategoryCount(category, count))}
                </Table.Tbody>
            </Table>
        );
    }

    function renderCategoryCount(category : string, count : number) : React.ReactNode
    {
        return (
            <Table.Tr key={category}>
                <Table.Td>{category}</Table.Td>
                <Table.Td>{count}</Table.Td>
            </Table.Tr>
        );
    }
}
