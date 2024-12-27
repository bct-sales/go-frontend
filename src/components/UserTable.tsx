import { Table } from "@mantine/core";

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
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Id</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Created At</Table.Th>
                </Table.Tr>
                {users.map(renderUser)}
            </Table.Thead>
        </Table>
    );


    function renderUser(user : User) : React.ReactNode
    {
        const createdAt = `${user.created_at.year}-${user.created_at.month}-${user.created_at.day} ${user.created_at.hour}:${user.created_at.minute}:${user.created_at.second}`;

        return (
            <Table.Tr key={user.id}>
                <Table.Td>
                    {user.id}
                </Table.Td>
                <Table.Td>
                    {user.role}
                </Table.Td>
                <Table.Td>
                    {createdAt}
                </Table.Td>
            </Table.Tr>
        );
    }
}