import Loading from "@/components/Loading";
import RestErrorViewer from "@/components/RestErrorViewer";
import ErrorPage from "@/pages/ErrorPage";
import { getItemCountsPerCategory, getSoldItemCountsPerCategory, ItemCountByCategory } from "@/rest/category-counts";
import { RestStatus } from "@/rest/status";
import React, { useEffect, useState } from "react";
import ActualCategoriesPage from "./ActualCategoriesPage";


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
        return (
            <ActualCategoriesPage itemCounts={itemCountsStatus.value} soldItemCounts={soldItemCountsStatus.value} />
        );
    }
}
