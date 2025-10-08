import CategoryCountsTable, { ItemCount } from "@/components/CategoryCountsTable";
import { ItemCountByCategory } from "@/rest/category-counts";
import { BarChart } from "@mantine/charts";
import { Card, Stack } from "@mantine/core";
import React from "react";


interface Props
{
    itemCounts: ItemCountByCategory[];
    soldItemCounts: ItemCountByCategory[];
}

export default function ActualCategoriesPage(props: Props) : React.ReactNode
{
    const combinedItemCounts = combineItemCounts(props.itemCounts, props.soldItemCounts);

    return (
        <Stack>
            <CategoryCountsTable itemCountsByCategory={combinedItemCounts} />
            {renderBarChart(combinedItemCounts)}
        </Stack>
    );

    function renderBarChart(itemCounts: ItemCount[]): React.ReactNode
    {
        const categoryKey = 'category';
        const soldItemsKey = 'SoldItems';
        const unsoldItemsKey = 'UnsoldItems';
        const barChartData = itemCounts.map(itemCount => {
            return {
                [categoryKey]: itemCount.categoryName,
                [soldItemsKey]: itemCount.soldCount,
                [unsoldItemsKey]: itemCount.count - itemCount.soldCount,
            };
        });

        const series = [
            {name: soldItemsKey, color: 'green.6'},
            {name: unsoldItemsKey, color: 'blue.6'},
        ];

        return (
            <Card padding='md'>
                <BarChart h={800} w={800} dataKey={categoryKey} data={barChartData} series={series} type='stacked' orientation="vertical" xAxisProps={{type: 'number'}} yAxisProps={{type: 'category'}} />
            </Card>
        );
    }
}

function combineItemCounts(itemCounts: ItemCountByCategory[], soldItemCounts: ItemCountByCategory[]): ItemCount[]
{
    const itemCountsTable = new Map<number, number>();
    const soldItemCountsTable = new Map<number, number>();
    const categoryNameTable = new Map<number, string>();

    for ( const itemCount of itemCounts )
    {
        categoryNameTable.set(itemCount.categoryId, itemCount.categoryName);
        itemCountsTable.set(itemCount.categoryId, itemCount.count);
    }

    for ( const soldItemCount of soldItemCounts )
    {
        if ( categoryNameTable.get(soldItemCount.categoryId) !== soldItemCount.categoryName )
        {
            console.error("Inconsistency detected in item count vs sold item count");
        }

        soldItemCountsTable.set(soldItemCount.categoryId, soldItemCount.count);
    }

    const categoryIds = [...itemCountsTable.keys()];
    return categoryIds.map(categoryId => {
        const categoryName = categoryNameTable.get(categoryId) ?? "<error>";
        const count = itemCountsTable.get(categoryId) ?? -1;
        const soldCount = soldItemCountsTable.get(categoryId) ?? -1;

        return {
            categoryId,
            categoryName,
            count,
            soldCount,
        };
    });
}
