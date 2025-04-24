import { Table } from "@mantine/core";
import classes from './UsersTable.module.css'
import DateTimeViewer from "./DateTimeViewer";
import { NavLink } from "react-router-dom";
import { DateTime } from "@/datetime";
import UserIdViewer from "./UserIdViewer";

interface Props
{
    users: User[];
}

interface User
{
    id: number;
    role: 'seller' | 'admin' | 'cashier';
    password: string;
    createdAt: DateTime;
    lastActivity?: DateTime;
    itemCount: number;
}

export default function UsersTable(props: Props): React.ReactNode
{
    const { users } = props;

    return (
        <Table className={classes.userTable}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Item Count</Table.Th>
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
                    <UserIdViewer userId={user.id} />
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {user.role}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {user.itemCount}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    <DateTimeViewer dateTime={user.createdAt} />
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {renderLastActivity(user.lastActivity)}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {user.password}
                </Table.Td>
            </Table.Tr>
        );
    }


    function renderLastActivity(lastActivity: User['lastActivity']): React.ReactNode
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