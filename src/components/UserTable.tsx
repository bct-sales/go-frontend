import { Table } from "@mantine/core";
import classes from './UserTable.module.css'
import DateTime from "./DateTime";

interface Props
{
    users: User[];
}

interface User
{
    id: number;
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
    last_activity: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    } | undefined;
}

export default function UserTable(props: Props): React.ReactNode
{
    const { users } = props;

    return (
        <Table className={classes.userTable}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Created At</Table.Th>
                    <Table.Th>Last Activity</Table.Th>
                    <Table.Th>Password</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {users.map(renderUser)}
            </Table.Tbody>
        </Table>
    );


    function renderUser(user: User): React.ReactNode
    {
        return (
            <Table.Tr key={user.id} className={classes.userRow}>
                <Table.Td className={classes.userData}>
                    {user.id}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {user.role}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    <DateTime dateTime={user.created_at} />
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {renderLastActivity(user.last_activity)}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {user.password}
                </Table.Td>
            </Table.Tr>
        );
    }

    function renderLastActivity(lastActivity: User['last_activity']): React.ReactNode
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