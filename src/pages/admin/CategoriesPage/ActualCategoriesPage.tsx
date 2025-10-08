import CategoryCountsTable, { ItemCount } from "@/components/CategoryCountsTable";
import { ItemCountByCategory } from "@/rest/category-counts";
import { BarChart } from "@mantine/charts";
import { Card, Group, SegmentedControl, Stack } from "@mantine/core";
import React from "react";


interface Props
{
    itemCounts: ItemCountByCategory[];
    soldItemCounts: ItemCountByCategory[];
}

export default function ActualCategoriesPage(props: Props) : React.ReactNode
{
    const [viewMode, setViewMode] = React.useState<'table' | 'chart'>('chart');
    const combinedItemCounts = combineItemCounts(props.itemCounts, props.soldItemCounts);

    return (
        <Stack>
            <Group justify="flex-end">
                {renderViewModeSwitch()}
            </Group>
            <Group w='800px' justify='center'>
                {renderView()}
            </Group>
        </Stack>
    );


    function renderView(): React.ReactNode
    {
        switch ( viewMode )
        {
            case 'table':
                return renderTable(combinedItemCounts);
            case 'chart':
                return renderBarChart(combinedItemCounts);
        }
    }

    function renderViewModeSwitch(): React.ReactNode
    {
        const data = [
            { label: "Chart", value: 'chart' },
            { label: "Table", value: 'table' },
        ];

        return (
            <SegmentedControl value={viewMode} onChange={onChange} data={data} />
        );


        function onChange(newMode: string)
        {
            switch ( newMode )
            {
                case 'table':
                    setViewMode('table');
                    break;
                case 'chart':
                    setViewMode('chart');
                    break;
                default:
                    console.debug(`BUG: an invalid view mode has been encountered: ${newMode}`);
                    setViewMode('table');
            }
        }
    }

    function renderTable(itemCounts: ItemCount[]): React.ReactNode
    {
        return (
            <CategoryCountsTable itemCountsByCategory={itemCounts} />
        );
    }

    function renderBarChart(itemCounts: ItemCount[]): React.ReactNode
    {
        const categoryKey = 'category';
        const soldItemsKey = '#Sold Items';
        const unsoldItemsKey = '#Unsold Items';
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
                <BarChart h={800} w={800} dataKey={categoryKey} data={barChartData} series={series} type='stacked' orientation="vertical" xAxisProps={{type: 'number'}} yAxisProps={{type: 'category', width: 120}} />
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
