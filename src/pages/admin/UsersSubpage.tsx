import UserTable from "@/components/UserTable";
import { listUsers, User } from "@/rest/admin/list-users";
import { useEffect, useState } from "react";


export default function UsersSubpage()
{
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
    }, []);

    return (
        <>
            <UserTable users={users} />
        </>
    );
}
