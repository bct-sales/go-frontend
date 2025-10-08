import CategoryCountsTable, { ItemCount } from "@/components/CategoryCountsTable";
import Loading from "@/components/Loading";
import RestErrorViewer from "@/components/RestErrorViewer";
import ErrorPage from "@/pages/ErrorPage";
import { getItemCountsPerCategory, getSoldItemCountsPerCategory, ItemCountByCategory } from "@/rest/category-counts";
import { RestStatus } from "@/rest/status";
import { BarChart } from "@mantine/charts";
import { Card, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";


export default function CategoriesPage() : React.ReactNode
{
    const [itemCountsStatus, setItemCountsStatus] = useState<RestStatus<ItemCountByCategory[]>>({ status: 'loading' });
    const [soldItemCountsStatus, setSoldItemCountsStatus] = useState<RestStatus<ItemCountByCategory[]>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            const data = await getItemCountsPerCategory();

            if (data.success)
            {
                setItemCountsStatus({ status: 'success', value: data.value.categories });
            }
            else
            {
                setItemCountsStatus({ status: 'error', tag: data.error.type, details: data.error.details });
            }
        })();
    }, []);

    useEffect(() => {
        void (async () => {
            const data = await getSoldItemCountsPerCategory();

            if (data.success)
            {
                setSoldItemCountsStatus({ status: 'success', value: data.value.categories });
            }
            else
            {
                setSoldItemCountsStatus({ status: 'error', tag: data.error.type, details: data.error.details });
            }
        })();
    }, []);

    if ( itemCountsStatus.status === 'error' )
    {
        return (
            <ErrorPage>
                <RestErrorViewer tag={itemCountsStatus.tag} details={itemCountsStatus.details} operation='getItemCountsPerCategory()' />
            </ErrorPage>
        );
    }
    else if ( soldItemCountsStatus.status === 'error' )
    {
        return (
            <ErrorPage>
                <RestErrorViewer tag={soldItemCountsStatus.tag} details={soldItemCountsStatus.details} operation='getSoldItemCountsPerCategory()' />
            </ErrorPage>
        );
    }
    if ( itemCountsStatus.status === 'loading' || soldItemCountsStatus.status === 'loading' )
    {
        return (
            <Loading message="Loading category counts..." />
        );
    }
    else
    {
        return renderPage(itemCountsStatus.value, soldItemCountsStatus.value);
    }


    function renderPage(itemCounts: ItemCountByCategory[], soldItemCounts: ItemCountByCategory[]) : React.ReactNode
    {
        const combinedItemCounts = combineItemCounts(itemCounts, soldItemCounts);

        return (
            <Stack>
                <CategoryCountsTable itemCountsByCategory={combinedItemCounts} />
                {renderBarChart(combinedItemCounts)}
            </Stack>
        );
    }

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