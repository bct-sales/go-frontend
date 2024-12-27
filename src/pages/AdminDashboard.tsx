import { ActionIcon, AppShell } from "@mantine/core";
import { IconShirt, IconUsersGroup } from "@tabler/icons-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UsersSubpage from "./admin/UsersSubpage";
import ItemsSubpage from "./admin/ItemsSubpage";
import React from "react";


export default function AdminDashboard()
{
    const navigate = useNavigate();

    return (
        <>
            <AppShell navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 60}}>
                <AppShell.Header>
                    Administration Dashboard
                </AppShell.Header>
                <AppShell.Navbar>
                    {renderNavbarLink("Users", "users", <IconUsersGroup />)}
                    {renderNavbarLink("Items", "items", <IconShirt />)}
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/users" element={<UsersSubpage />} />
                        <Route path="/items" element={<ItemsSubpage />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );


    function renderNavbarLink(label : string, to : string, Icon : React.ReactNode) : React.ReactNode
    {
        return (
            <ActionIcon onClick={followLink(to)} title={label}>
                {Icon}
            </ActionIcon>
        );
    }

    function followLink(url : string) : () => void
    {
        return () => {
            navigate(`/admin/${url}`);
        }
    }
}
