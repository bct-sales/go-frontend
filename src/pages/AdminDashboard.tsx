import { AppShell, Button } from "@mantine/core";
import { IconUsersGroup } from "@tabler/icons-react";
import { Route, Routes } from "react-router-dom";
import UsersSubpage from "./admin/UsersSubpage";


export default function AdminDashboard()
{
    // const navigate = useNavigate();

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
                    <Routes>
                        <Route path="/users" element={<UsersSubpage />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
