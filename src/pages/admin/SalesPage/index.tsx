import Loading from "@/components/Loading";
import { listRecentSales } from "@/rest/list-sales";
import { getSaleInformation } from "@/rest/sale-information";
import { RestStatus } from "@/rest/status";
import { replaceAtIndex } from "@/util";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "./SalesTable";


export default function SalesPage() : React.ReactNode
{
    const [status, setStatus] = useState<RestStatus<Sale[]>>({status: "loading"});

    useEffect(() => {
        void (async () => {
            const response = await listRecentSales(20);

            if (response.success)
            {
                const sales = response.value.sales;
                setStatus({status: "success", value: sales});
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


    function renderPage(recentSales: Sale[]): React.ReactNode
    {
        return (
            <>
                <SalesTable sales={recentSales} requestSaleDetails={requestSaleDetails} />
            </>
        );


        async function requestSaleDetails(saleIndex: number): Promise<void>
        {
            const sale = recentSales[saleIndex];
            const saleInformation = await getSaleInformation(sale.saleId)

            if ( saleInformation.success )
            {
                const updatedSale: Sale = {
                    ...sale,
                    items: saleInformation.value.items,
                };
                const updatedSales = replaceAtIndex(recentSales, saleIndex, updatedSale);
                setStatus({status: "success", value: updatedSales});
            }
            else
            {
                notifications.show({
                    title: "Error",
                    message: `Failed to load sale details`,
                    color: "red",
                });

                console.error(`Failed to load sale details for sale ID ${sale.saleId}:`, saleInformation.error);
            }
        }
    }
}
