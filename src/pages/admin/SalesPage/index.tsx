import Loading from "@/components/Loading";
import { listRecentSales } from "@/rest/list-sales";
import { getSaleInformation } from "@/rest/sale-information";
import { RestStatus } from "@/rest/status";
import { replaceAtIndex } from "@/util";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "./SalesTable";
import SaleOverview from "./SaleOverview";


interface Data
{
    recentSales: Sale[];
    saleCount: number;
    totalSaleValue: number;
}

export default function SalesPage() : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<Data>>({status: "loading"});

    useEffect(() => {
        void (async () => {
            const response = await listRecentSales(20);

            if (response.success)
            {
                const data = {
                    recentSales: response.value.sales,
                    saleCount: response.value.saleCount,
                    totalSaleValue: response.value.totalSaleValueInCents,
                };

                setStatus({status: "success", value: data});
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
                <SaleOverview saleCount={data.saleCount} totalSaleValue={data.totalSaleValue} />
                <SalesTable sales={data.recentSales} />
            </>
        );
    }
}
