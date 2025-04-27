import ItemsTable from "@/components/ItemsTable";
import Loading from "@/components/Loading";
import UserTable from "@/components/UserTable";
import { AdminUserInformation, CashierUserInformation, getUserInformation, SellerUserInformation, SuccessResponse } from "@/rest/admin/user-information";
import { RestStatus } from "@/rest/status";
import { Loader, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function UserSubpage()
{
    const { userId } = useParams<{ userId: string }>();
    const [state, setState] = useState<RestStatus<SuccessResponse>>({ status: 'loading' });

    useEffect(() => {
            void (async () => {
                if ( !userId || !/\d+/.test(userId) )
                {
                    setState({ status: 'error', tag: 'invalid_user_id', details: 'Invalid user ID' });
                    return;
                }

                const response = await getUserInformation(parseInt(userId));

                if (response.success)
                {
                    setState({ status: 'success', value: response.value });
                }
                else
                {
                    setState({ status: 'error', tag: response.error.type, details: response.error.details });
                }
            })();
        }, [userId]);

    switch (state.status)
    {
        case 'error':
            return (
                <div>Error: {state.tag} - {state.details}</div>
            );

        case 'loading':
            return (
                <Loading message="Loading user information..." />
            );

        case 'success':
            return renderPage(state.value);
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
        return (
            <Stack>
                <UserTable {...userInformation} />
                <ItemsTable items={userInformation.items} />
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
