import ItemTable from "@/components/ItemTable";
import UserTable from "@/components/UserTable";
import { AdminUserInformation, CashierUserInformation, getUserInformation, SellerUserInformation, SuccessResponse } from "@/rest/admin/user-information";
import { Loader, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


type State =
  | { status: 'loading' }
  | { status: 'error', details: string }
  | { status: 'success', value: SuccessResponse };


export default function UserSubpage()
{
    const { userId } = useParams<{ userId: string }>();
    const [state, setState] = useState<State>({ status: 'loading' });

    useEffect(() => {
            void (async () => {
                if ( !userId || !/\d+/.test(userId) )
                {
                    setState({ status: 'error', details: 'Invalid user ID' });
                    return;
                }

                const response = await getUserInformation(parseInt(userId));

                if (response.success)
                {
                    setState({ status: 'success', value: response.value });
                }
                else
                {
                    console.error(response.error);
                    setState({ status: 'error', details: response.error.details });
                }
            })();
        }, [userId]);

    if (state.status === 'loading')
    {
        return (
            <Loader variant="dots" />
        );
    }
    else if (state.status === 'success')
    {
        const userInformation = state.value;

        switch (userInformation.role)
        {
            case 'admin':
                return renderAdmin(userInformation);
            case 'cashier':
                return renderCashier(userInformation);
            case 'seller':
                return renderSeller(userInformation);
            default:
                return (
                    <span>Unknown role</span>
                );
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
                <ItemTable items={userInformation.items} />
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
