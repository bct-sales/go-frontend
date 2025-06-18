import ItemsTable from "@/components/ItemsTable";
import { addedAtColumn, categoryColumn, charityColumn, descriptionColumn, donationColumn, itemIdColumn, priceInCentsColumn } from "@/components/ItemsTable/columns";
import Loading from "@/components/Loading";
import UserTable from "@/components/UserTable";
import { AdminUserInformation, CashierUserInformation, getUserInformation, SellerUserInformation, SuccessResponse } from "@/rest/admin/user-information";
import { RestStatus } from "@/rest/status";
import { Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function UserSubpage()
{
    const { userId } = useParams<{ userId: string }>();
    const [status, setStatus] = useState<RestStatus<SuccessResponse>>({ status: 'loading' });

    useEffect(() => {
            void (async () => {
                if ( !userId || !/^\d+$/.test(userId) )
                {
                    setStatus({ status: 'error', tag: 'invalid_user_id', details: 'Invalid user ID' });
                    return;
                }

                const response = await getUserInformation(parseInt(userId));

                if (response.success)
                {
                    setStatus({ status: 'success', value: response.value });
                }
                else
                {
                    setStatus({ status: 'error', tag: response.error.type, details: response.error.details });
                }
            })();
        }, [userId]);

    switch (status.status)
    {
        case 'error':
            return (
                <div>Error: {status.tag} - {status.details}</div>
            );

        case 'loading':
            return (
                <Loading message="Loading user information..." />
            );

        case 'success':
            return renderPage(status.value);
    }


    function renderPage(userInformation: SuccessResponse): React.ReactNode
    {
        switch (userInformation.role)
        {
            case 'admin':
                return renderAdmin(userInformation);
            case 'cashier':
                return renderCashier(userInformation);
            case 'seller':
                return renderSeller(userInformation);
        }
    }

    function renderAdmin(userInformation: AdminUserInformation): React.ReactNode
    {
        return (
            <UserTable {...userInformation} />
        );
    }

    function renderSeller(userInformation: SellerUserInformation): React.ReactNode
    {
        const columns = [
            itemIdColumn,
            descriptionColumn,
            addedAtColumn,
            categoryColumn,
            priceInCentsColumn,
            charityColumn,
            donationColumn,
        ];

        return (
            <Stack>
                <UserTable {...userInformation} />
                <ItemsTable items={userInformation.items} columns={columns} />
            </Stack>
        );
    }

    function renderCashier(userInformation: CashierUserInformation): React.ReactNode
    {
        return (
            <Stack>
                <UserTable {...userInformation} />
            </Stack>
        );
    }
}
