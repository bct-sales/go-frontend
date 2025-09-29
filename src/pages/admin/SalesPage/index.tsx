import CaptionedBox from "@/components/CaptionedBox";
import Loading from "@/components/Loading";
import { listRecentSales } from "@/rest/list-sales";
import { RestStatus } from "@/rest/status";
import { useUpdateNotifications as useUpdateNotifier } from "@/websocket";
import React, { useEffect, useState } from "react";
import SaleOverview from "./SaleOverview";
import SalesTable, { Sale } from "./SalesTable";
import ErrorPage from "@/pages/ErrorPage";
import RestErrorViewer from "@/components/RestErrorViewer";


interface Data
{
    sales: Sale[];
    saleCount: number;
    totalSaleValueInCents: number;
    itemCount: number;
    distinctSoldItemCount: number;
    totalSoldItemCount: number;
    totalItemValue: number;
}

export default function SalesPage() : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<Data>>({status: "loading"});
    const updateNotifier = useUpdateNotifier();
    useEffect(() => {
        refreshData();
    }, []);
    useEffect(() => {
        return updateNotifier.register(refreshData);
    }, [updateNotifier])

    switch (status.status)
    {
        case "success":
            return renderPage(status.value);

        case "loading":
            return (
                <Loading message="Loading items..." />
            );

        case "error":
            return (
                <ErrorPage>
                    <RestErrorViewer tag={status.tag} details={status.details} />
                </ErrorPage>
            );
    }


    function renderPage(data: Data): React.ReactNode
    {
        return (
            <>
                <SaleOverview
                    saleCount={data.saleCount}
                    totalSaleValue={data.totalSaleValueInCents}
                    itemCount={data.itemCount}
                    distinctSoldItemCount={data.distinctSoldItemCount}
                    totalSoldItemCount={data.totalSoldItemCount}
                    totalItemValue={data.totalItemValue}
                />
                <CaptionedBox caption="Recent Sales">
                    <SalesTable sales={data.sales} />
                </CaptionedBox>
            </>
        );
    }

    async function refreshData()
    {
        const response = await listRecentSales(10);

        if (response.success)
        {
            setStatus({status: "success", value: response.value});
        }
        else
        {
            setStatus({status: "error", tag: response.error.type, details: response.error.details});
        }
    }
}
