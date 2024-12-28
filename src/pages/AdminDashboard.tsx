import { ActionIcon, AppShell } from "@mantine/core";
import { IconGraph, IconShirt, IconUsersGroup } from "@tabler/icons-react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UsersSubpage from "./admin/UsersSubpage";
import ItemsSubpage from "./admin/ItemsSubpage";
import React from "react";
import OverviewSubpage from "./admin/OverviewSubpage";


export default function AdminDashboard()
{
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <AppShell navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 60}}>
                <AppShell.Header>
                    Administration Dashboard
                </AppShell.Header>
                <AppShell.Navbar>
                    {renderNavbarLink("Overview", "/admin", <IconGraph />)}
                    {renderNavbarLink("Users", "/admin/users", <IconUsersGroup />)}
                    {renderNavbarLink("Items", "/admin/items", <IconShirt />)}
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<OverviewSubpage />} />
                        <Route path="/users" element={<UsersSubpage />} />
                        <Route path="/items" element={<ItemsSubpage />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );


    function renderNavbarLink(label : string, to : string, Icon : React.ReactNode) : React.ReactNode
    {
        const isActive = to === location.pathname;

        return (
            <ActionIcon onClick={followLink(to)} title={label} size="xl" variant={isActive ? 'filled' : 'light'}>
                {Icon}
            </ActionIcon>
        );
    }

    function followLink(url : string) : () => void
    {
        return () => {
            navigate(url);
        }
    }
}
