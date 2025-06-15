import Loading from "@/components/Loading";
import { listSales, Sale } from "@/rest/admin/list-sales";
import { RestStatus } from "@/rest/status";
import React, { useEffect, useState } from "react";
import SalesTable from "./SalesTable";


export default function SalesPage() : React.ReactNode
{
    const [antiChronologicalSalesStatus, setSalesStatus] = useState<RestStatus<Sale[]>>({status: "loading"});

    useEffect(() => {
        void (async () => {
            const response = await listSales();

            if (response.success)
            {
                const sales = response.value.sales;
                sales.reverse();
                setSalesStatus({status: "success", value: sales});
            }
            else
            {
                setSalesStatus({status: "error", tag: response.error.type, details: response.error.details});
            }
        })();
    }, []);

    switch (antiChronologicalSalesStatus.status)
    {
        case "success":
            return renderPage(antiChronologicalSalesStatus.value);

        case "loading":
            return (
                <Loading message="Loading items..." />
            );

        case "error":
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {antiChronologicalSalesStatus.tag}: {antiChronologicalSalesStatus.details}
                </div>
            );
    }


    function renderPage(antiChronologicalSales: Sale[]): React.ReactNode
    {
        return (
            <>
                <SalesTable sales={antiChronologicalSales} />
            </>
        );
    }
}
