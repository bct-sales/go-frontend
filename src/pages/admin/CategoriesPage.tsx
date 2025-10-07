import CategoryCountsTable from "@/components/CategoryCountsTable";
import Loading from "@/components/Loading";
import { getItemCountsPerCategory, ItemCountByCategory } from "@/rest/category-counts";
import { RestStatus } from "@/rest/status";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import RestErrorViewer from "@/components/RestErrorViewer";


export default function CategoriesPage() : React.ReactNode
{
    const [itemCountsStatus, setItemCountsStatus] = useState<RestStatus<ItemCountByCategory[]>>({ status: 'loading' });

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

    switch (itemCountsStatus.status)
    {
        case 'success':
            return renderPage(itemCountsStatus.value);

        case 'loading':
            return (
                <Loading message="Loading category counts..." />
            );

        case 'error':
            return (
                <ErrorPage>
                    <RestErrorViewer tag={itemCountsStatus.tag} details={itemCountsStatus.details} operation='getItemCountsPerCategory()' />
                </ErrorPage>
            );
    }


    function renderPage(categoryCounts: ItemCountByCategory[]) : React.ReactNode
    {
        return (
            <CategoryCountsTable categoryCounts={categoryCounts} />
        );
    }
}
