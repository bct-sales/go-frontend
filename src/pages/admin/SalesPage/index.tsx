import Loading from "@/components/Loading";
import { listSales, Sale } from "@/rest/admin/list-sales";
import { RestStatus } from "@/rest/status";
import React, { useEffect, useState } from "react";
import SalesTable from "./SalesTable";


export default function SalesPage() : React.ReactNode
{
    const [salesStatus, setSalesStatus] = useState<RestStatus<Sale[]>>({status: "loading"});

    useEffect(() => {
        void (async () => {
            const response = await listSales();

            if (response.success)
            {
                setSalesStatus({status: "success", value: response.value.sales});
            }
            else
            {
                setSalesStatus({status: "error", tag: response.error.type, details: response.error.details});
            }
        })();
    }, []);

    switch (salesStatus.status)
    {
        case "success":
            return renderPage(salesStatus.value);

        case "loading":
            return (
                <Loading message="Loading items..." />
            );

        case "error":
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {salesStatus.tag}: {salesStatus.details}
                </div>
            );
    }


    function renderPage(sales: Sale[]): React.ReactNode
    {
        return (
            <>
                <SalesTable sales={sales} />
            </>
        );
    }
}
