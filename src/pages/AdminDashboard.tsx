import UserTable from "@/components/UserTable";
import { listUsers, User } from "@/rest/list-users";
import { AppShell, Button } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
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
            <AppShell navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 60}}>
                <AppShell.Header>
                    Administration Dashboard
                </AppShell.Header>
                <AppShell.Navbar>
                    <Button><IconUsersGroup /></Button>
                </AppShell.Navbar>
                <AppShell.Main>
                    <UserTable users={users} />
                </AppShell.Main>
            </AppShell>
        </>
    );
}
