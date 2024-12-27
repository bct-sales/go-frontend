import { listUsers, User } from "@/rest/list-users";
import { Center } from "@mantine/core";
import { useEffect, useState } from "react";


export default function AdminDashboard()
{
    // const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        void (async () => {
            const users = await listUsers();

            if (users !== undefined)
            {
                setUsers(users);
            }
            else
            {
                console.log(`Failed to list users`);
                // TODO handle error
            }
        })();
    }, [])

    return (
        <>
            <Center mih='50vh'>
                <p>Admin Dashboard</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Role</th>
                            <th>Created At</th>
                        </tr>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.role}</td>
                                <td>{user.created_at.year}-{user.created_at.month}-{user.created_at.day} {user.created_at.hour}:{user.created_at.minute}:{user.created_at.second}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Center>
        </>
    );
}
