import UserTable from "@/components/UserTable";
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
                <UserTable users={users} />
            </Center>
        </>
    );
}
