import UserTable from "@/components/UsersTable";
import { listUsers, User } from "@/rest/admin/list-users";
import { useEffect, useState } from "react";


export default function UsersSubpage()
{
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        void (async () => {
            const response = await listUsers();

            if (response.success)
            {
                setUsers(response.value);
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
