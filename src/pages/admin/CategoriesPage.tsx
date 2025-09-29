import CategoryCountsTable from "@/components/CategoryCountsTable";
import Loading from "@/components/Loading";
import { getItemCountsPerCategory, ItemCountByCategory } from "@/rest/category-counts";
import { RestStatus } from "@/rest/status";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage";
import RestErrorViewer from "@/components/RestErrorViewer";


export default function CategoriesPage() : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<ItemCountByCategory[]>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            const data = await getItemCountsPerCategory();

            if (data.success)
            {
                setStatus({ status: 'success', value: data.value.categories });
            }
            else
            {
                setStatus({ status: 'error', tag: data.error.type, details: data.error.details });
            }
        })();
    }, []);

    switch (status.status)
    {
        case 'success':
            return renderPage(status.value);

        case 'loading':
            return (
                <Loading message="Loading category counts..." />
            );

        case 'error':
            return (
                <ErrorPage>
                    <RestErrorViewer tag={status.tag} details={status.details} operation='getItemCountsPerCategory()' />
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
