import CategoryCountsTable from "@/components/CategoryCountsTable";
import { getItemCountsPerCategory, ItemCountByCategory } from "@/rest/item-counts";
import { useEffect, useState } from "react";


export default function CategoriesSubpage() : React.ReactNode
{
    const [categoryCounts, setCategoryCounts] = useState<ItemCountByCategory[] | undefined>(undefined);

    useEffect(() => {
        void (async () => {
            const data = await getItemCountsPerCategory();

            if (data.success)
            {
                setCategoryCounts(data.value.counts);
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
            <CategoryCountsTable categoryCounts={categoryCounts} />
        );
    }
}
