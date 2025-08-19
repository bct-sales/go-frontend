import { useAuthentication } from "@/authentication";
import RedirectToLoginPage from "@/components/RedirectToLoginPage";
import UpdateProvider from "@/components/UpdateProvider.tsx";
import { ActionIcon, AppShell, Flex } from "@mantine/core";
import { IconCashRegister, IconChartBar, IconLogout, IconShirt, IconUsersGroup } from "@tabler/icons-react";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CategoriesPage from "../admin/CategoriesPage";
import ItemsPage from "../admin/ItemsPage";
import SalePage from "../admin/SalePage.tsx";
import SalesPage from "../admin/SalesPage";
import UserSubpage from "../admin/UserPage";
import UsersOverviewPage from "../admin/UsersOverviewPage";
import classes from './AdminDashboard.module.css';
import DashboardHeader from "./DashboardHeader.tsx";


export default function AdminDashboard()
{
    const authentication = useAuthentication();
    const location = useLocation();
    const navigate = useNavigate();
    const authenticated = authentication.status === 'authenticated' && authentication.role === 'admin';

    if ( !authenticated )
    {
        return (
            <RedirectToLoginPage />
        );
    }

    return (
        <>
            <UpdateProvider>
                <AppShell navbar={{width: 100, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 100}}>
                    <AppShell.Header>
                        <DashboardHeader title="Administration Dashboard" userId={authentication.username} role={authentication.role} />
                    </AppShell.Header>
                    <AppShell.Navbar>
                        <Flex direction="column" align="center" justify="flex-start" gap="md" m="lg" style={{height: '100%'}}>
                            {renderNavbarLink("Categories", "/admin", <IconChartBar />)}
                            {renderNavbarLink("Users", "/admin/users", <IconUsersGroup />)}
                            {renderNavbarLink("Items", "/admin/items", <IconShirt />)}
                            {renderNavbarLink("Sales", "/admin/sales", <IconCashRegister />)}
                            {renderNavbarLink("Logout", "/logout", <IconLogout />)}
                        </Flex>
                    </AppShell.Navbar>
                    <AppShell.Main className={classes.main}>
                        <Routes>
                            <Route path="/" element={<CategoriesPage />} />
                            <Route path="/users/:userId" element={<UserSubpage />} />
                            <Route path="/users" element={<UsersOverviewPage />} />
                            <Route path="/items" element={<ItemsPage />} />
                            <Route path="/sales" element={<SalesPage />} />
                            <Route path="/sales/:saleId" element={<SalePage />} />
                        </Routes>
                    </AppShell.Main>
                </AppShell>
            </UpdateProvider>
        </>
    );


    function renderNavbarLink(label: string, to: string, Icon: React.ReactNode): React.ReactNode
    {
        const isActive = to === location.pathname;

        return (
            <ActionIcon onClick={followLink(to)} title={label} size={64} variant={isActive ? 'filled' : 'light'}>
                {Icon}
            </ActionIcon>
        );
    }

    function followLink(url : string) : () => void
    {
        return () => {
            navigate(url);
        };
    }
}
