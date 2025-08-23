import { Table } from "@mantine/core";
import DateTimeViewer from "./DateTimeViewer";
import { DateTime } from "@/datetime";

interface Props
{
    userId: number;
    role: 'seller' | 'admin' | 'cashier';
    password: string;
    createdAt: DateTime;
    lastActivity?: DateTime;
}

export default function UserTable(props: Props): React.ReactNode
{
    return (
        <Table variant="vertical">
            <Table.Tbody>
                <Table.Tr>
                    <Table.Th>User ID</Table.Th>
                    <Table.Td>{props.userId}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Password</Table.Th>
                    <Table.Td>{props.password}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Creation Time</Table.Th>
                    <Table.Td><DateTimeViewer dateTime={props.createdAt} /></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>Last Activity</Table.Th>
                    <Table.Td>{renderLastActivity(props.lastActivity)}</Table.Td>
                </Table.Tr>
            </Table.Tbody>
        </Table>
    );


    function renderLastActivity(lastActivity?: DateTime): React.ReactNode
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