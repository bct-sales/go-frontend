import CategoryCountsTable from "@/components/CategoryCountsTable";
import Loading from "@/components/Loading";
import { getItemCountsPerCategory, getSoldItemCountsPerCategory, ItemCountByCategory } from "@/rest/category-counts";
import { RestStatus } from "@/rest/status";
import { useEffect, useState } from "react";
import ErrorPage from "@/pages/ErrorPage";
import RestErrorViewer from "@/components/RestErrorViewer";


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
        const combinedItemCounts = categoryIds.map(categoryId => {
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

        return (
            <CategoryCountsTable itemCountsByCategory={combinedItemCounts} />
        );
    }
}
