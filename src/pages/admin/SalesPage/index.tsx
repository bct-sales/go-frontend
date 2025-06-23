import Loading from "@/components/Loading";
import { listRecentSales } from "@/rest/list-sales";
import { RestStatus } from "@/rest/status";
import React, { useEffect, useState } from "react";
import SaleOverview from "./SaleOverview";
import SalesTable, { Sale } from "./SalesTable";
import CaptionedBox from "@/components/CaptionedBox";


interface Data
{
    sales: Sale[];
    saleCount: number;
    totalSaleValueInCents: number;
    itemCount: number;
    soldItemCount: number;
}

export default function SalesPage() : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<Data>>({status: "loading"});

    useEffect(() => {
        void (async () => {
            const response = await listRecentSales(10);

            if (response.success)
            {
                setStatus({status: "success", value: response.value});
            }
            else
            {
                setStatus({status: "error", tag: response.error.type, details: response.error.details});
            }
        })();
    }, []);

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
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {status.tag}: {status.details}
                </div>
            );
    }


    function renderPage(data: Data): React.ReactNode
    {
        return (
            <>
                <SaleOverview saleCount={data.saleCount} totalSaleValue={data.totalSaleValueInCents} itemCount={data.itemCount} soldItemCount={data.soldItemCount} />
                <CaptionedBox caption="Recent Sales">
                    <SalesTable sales={data.sales} />
                </CaptionedBox>
            </>
        );
    }
}
