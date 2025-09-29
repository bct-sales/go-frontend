import CaptionedBox from "@/components/CaptionedBox";
import Loading from "@/components/Loading";
import { getSaleInformation, SuccessResponse } from "@/rest/sale-information";
import { RestStatus } from "@/rest/status";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemTable from "./ItemTable";
import SaleInformation from "./SaleInformation";
import ErrorPage from "@/pages/ErrorPage";
import RestErrorViewer from "@/components/RestErrorViewer";


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
                <ErrorPage>
                    <RestErrorViewer tag={saleStatus.tag} details={saleStatus.details} />
                </ErrorPage>
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
