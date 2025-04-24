import DateTime from "@/components/DateTime";
import ItemTable from "@/components/ItemTable";
import { getUserInformation, SuccessResponse } from "@/rest/admin/user-information";
import { Loader, Stack, Table } from "@mantine/core";
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

        return (
            <>
                <Stack>
                    <Table variant="vertical">
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th>User ID</Table.Th>
                                <Table.Td>{userInformation.user_id}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>Password</Table.Th>
                                <Table.Td>{userInformation.password}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>Creation Time</Table.Th>
                                <Table.Td><DateTime dateTime={userInformation.created_at} /></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>Last Activity</Table.Th>
                                <Table.Td>{renderLastActivity(userInformation.last_activity)}</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </Stack>
            </>
        );


        function renderLastActivity(lastActivity: SuccessResponse['last_activity']): React.ReactNode
        {
            if (lastActivity === undefined)
            {
                return (
                    <span>NA</span>
                );
            }
            else
            {
                return (
                    <DateTime dateTime={lastActivity} />
                );
            }
        }
    }
}
