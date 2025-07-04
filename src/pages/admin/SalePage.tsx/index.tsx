import CaptionedBox from "@/components/CaptionedBox";
import CategoryViewer from "@/components/CategoryViewer";
import CharityViewer from "@/components/CharityViewer";
import DateTimeViewer from "@/components/DateTimeViewer";
import DonationViewer from "@/components/DonationViewer";
import Loading from "@/components/Loading";
import Price from "@/components/Price";
import { getSaleInformation, Item, SuccessResponse } from "@/rest/sale-information";
import { RestStatus } from "@/rest/status";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SaleInformation from "./SaleInformation";
import ItemTable from "./ItemTable";


export default function SalePage()
{
    const { saleId: saleIdString } = useParams<{ saleId: string }>();
    const [saleStatus, setSaleStatus] = useState<RestStatus<SuccessResponse>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            if ( !saleIdString || !/^\d+$/.test(saleIdString) )
            {
                setSaleStatus({ status: 'error', tag: 'invalid_user_id', details: 'Invalid user ID' });
                return;
            }

            const saleId = parseInt(saleIdString);

            if ( isNaN(saleId) )
            {
                // Should not happen due to regex check, but just in case
                setSaleStatus({ status: 'error', tag: 'invalid_user_id', details: 'Invalid user ID' });
                return;
            }

            const response = await getSaleInformation(saleId);

            if (response.success)
            {
                setSaleStatus({ status: 'success', value: response.value });
            }
            else
            {
                setSaleStatus({ status: 'error', tag: response.error.type, details: response.error.details });
            }
        })();
    }, [saleIdString]);

    switch (saleStatus.status)
    {
        case 'error':
            return (
                <div>Error: {saleStatus.tag} - {saleStatus.details}</div>
            );

        case 'loading':
            return (
                <Loading message="Loading sale information..." />
            );

        case 'success':
            return renderPage(saleStatus.value);
    }


    function renderPage(saleInformation: SuccessResponse): React.ReactNode
    {
        return (
            <>
                <CaptionedBox caption="Sale Information">
                    <SaleInformation sale={saleInformation} />
                </CaptionedBox>
                <CaptionedBox caption="Items">
                    <ItemTable items={saleInformation.items} />
                </CaptionedBox>
            </>
        );
    }
}
