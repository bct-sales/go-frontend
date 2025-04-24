import { Table } from "@mantine/core";
import DateTimeViewer from "./DateTimeViewer";
import { DateTime } from "@/datetime";

interface Props
{
    user_id: number;
    role: 'seller' | 'admin' | 'cashier';
    password: string;
    created_at: DateTime;
    last_activity?: DateTime;
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
                    <Table.Td><DateTimeViewer dateTime={props.created_at} /></Table.Td>
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
                <DateTimeViewer dateTime={lastActivity} />
            );
        }
    }
}