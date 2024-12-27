import { Table } from "@mantine/core";
import classes from './UserTable.module.css'

interface Props
{
    users: User[];
}

interface User
{
    id: number;
    role: 'seller' | 'admin' | 'cashier';
    created_at: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
}

export default function UserTable(props : Props) : React.ReactNode
{
    const { users } = props;

    return (
        <Table className={classes.userTable}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Created At</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {users.map(renderUser)}
            </Table.Tbody>
        </Table>
    );


    function renderUser(user : User) : React.ReactNode
    {
        const createdAt = `${user.created_at.year}-${user.created_at.month}-${user.created_at.day} ${user.created_at.hour}:${user.created_at.minute}:${user.created_at.second}`;

        return (
            <Table.Tr key={user.id} className={classes.userRow}>
                <Table.Td className={classes.userData}>
                    {user.id}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {user.role}
                </Table.Td>
                <Table.Td className={classes.userData}>
                    {createdAt}
                </Table.Td>
            </Table.Tr>
        );
    }
}