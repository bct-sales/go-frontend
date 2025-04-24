import { Table } from "@mantine/core";
import DateTime from "./DateTime";

interface Props
{
    user_id: number;
    role: 'seller' | 'admin' | 'cashier';
    password: string;
    created_at: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    last_activity?: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
}

export default function UserTable(props: Props): React.ReactNode
{
    return (
        <Table variant="vertical">
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>User ID</Table.Th>
                    <Table.Td>{props.user_id}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Password</Table.Th>
                    <Table.Td>{props.password}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Creation Time</Table.Th>
                    <Table.Td><DateTime dateTime={props.created_at} /></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Last Activity</Table.Th>
                    <Table.Td>{renderLastActivity(props.last_activity)}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );


    function renderLastActivity(lastActivity?: { year: number, month: number, day: number, hour: number, minute: number, second: number }): React.ReactNode
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