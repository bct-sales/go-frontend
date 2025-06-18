import Loading from "@/components/Loading";
import { listSales } from "@/rest/admin/list-sales";
import { RestStatus } from "@/rest/status";
import React, { useEffect, useState } from "react";
import SalesTable, { Sale } from "./SalesTable";
import { replaceAtIndex } from "@/util";
import { getSaleInformation } from "@/rest/sale-information";
import { notifications } from "@mantine/notifications";


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
                <SalesTable sales={antiChronologicalSales} requestSaleDetails={requestSaleDetails} />
            </>
        );


        async function requestSaleDetails(saleIndex: number): Promise<void>
        {
            const sale = antiChronologicalSales[saleIndex];
            const saleInformation = await getSaleInformation(sale.saleId)

            if ( saleInformation.success )
            {
                const updatedSale: Sale = {
                    ...sale,
                    items: saleInformation.value.items,
                };
                const updatedSales = replaceAtIndex(antiChronologicalSales, saleIndex, updatedSale);
                setSalesStatus({status: "success", value: updatedSales});
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
