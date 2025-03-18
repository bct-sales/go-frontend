import { ActionIcon, AppShell, Flex } from "@mantine/core";
import { IconGraph, IconLogout } from "@tabler/icons-react";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ItemsSubpage from "./seller/ItemsSubpage";
import OverviewSubpage from "./seller/OverviewSubpage";


export default function SellerDashboard()
{
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <AppShell navbar={{width: 100, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 60}}>
                <AppShell.Header>
                    Seller Dashboard
                </AppShell.Header>
                <AppShell.Navbar>
                    <Flex direction="column" align="center" justify="flex-start" gap="md" m="lg" style={{height: '100%'}}>
                        {renderNavbarLink("Overview", "/seller", <IconGraph />)}
                        {renderNavbarLink("Logout", "/logout", <IconLogout />)}
                    </Flex>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<OverviewSubpage />} />
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
            <ActionIcon onClick={followLink(to)} title={label} size={64} variant={isActive ? 'filled' : 'light'}>
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
