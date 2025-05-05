import { ActionIcon, AppShell, Flex, Stack, Text } from "@mantine/core";
import { IconEdit, IconList, IconLogout, IconPlus } from "@tabler/icons-react";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ItemsSubpage from "../seller/ItemsSubpage";
import { useAuthentication } from "@/authentication";
import classes from './SellerDashboard.module.css';
import AuthenticationViewer from "@/components/AuthenticationViewer";
import AddItemSubpage from "../seller/AddItemSubpage";


export default function SellerDashboard()
{
    const authentication = useAuthentication();
    const location = useLocation();
    const navigate = useNavigate();

    if ( authentication.status !== 'authenticated' || authentication.role !== 'seller' )
    {
        return (
            <Stack justify="center" align="center" style={{height: '100vh'}}>
                <h1>Lost authentication data!</h1>
            </Stack>
        );
    }

    return (
        <>
            <AppShell navbar={{width: 100, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 100}}>
            <AppShell.Header>
                    <Flex direction="row" align="center" justify="space-between" gap="md" p="xl" style={{height: '100%'}}>
                        <Text className={classes.header}>Seller Dashboard</Text>
                        <AuthenticationViewer username={authentication.username} role={authentication.role} />
                    </Flex>
                </AppShell.Header>
                <AppShell.Navbar>
                    <Flex direction="column" align="center" justify="flex-start" gap="md" m="lg" style={{height: '100%'}}>
                        {renderNavbarLink("Items", "/seller", <IconList />)}
                        {renderNavbarLink("Add Item", "/seller/add-item", <IconPlus />)}
                        {renderNavbarLink("Edit Item", "/seller/edit-item", <IconEdit />)}
                        {renderNavbarLink("Logout", "/logout", <IconLogout />)}
                    </Flex>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<ItemsSubpage sellerId={authentication.username} />} />
                        <Route path="/add-item" element={<AddItemSubpage sellerId={authentication.username} />} />
                        <Route path="/edit-item" element={<EditItemSubpage sellerId={authentication.username} />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
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

    function followLink(url: string): () => void
    {
        return () => {
            navigate(url);
        };
    }
}
