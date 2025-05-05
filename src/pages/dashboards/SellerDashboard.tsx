import { ActionIcon, AppShell, Flex, Stack, Text } from "@mantine/core";
import { IconEdit, IconList, IconLogout, IconPlus } from "@tabler/icons-react";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ItemsSubpage from "../seller/ItemsSubpage";
import { useAuthentication } from "@/authentication";
import classes from './SellerDashboard.module.css';
import AuthenticationViewer from "@/components/AuthenticationViewer";
import AddItemSubpage from "../seller/AddItemSubpage";
import EditItemSubpage from "../seller/EditItemSubpage";
import NavigationButton from "@/components/NavigationButton";


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
                        <NavigationButton caption="Items" url="/seller">
                            <IconList />
                        </NavigationButton>
                        <NavigationButton caption="Add Item" url="/seller/add-item">
                            <IconPlus />
                        </NavigationButton>
                        <NavigationButton caption="Edit Item" url="/seller/edit-item" onlyShowWhenActive={true}>
                            <IconEdit />
                        </NavigationButton>
                        <NavigationButton caption="Logout" url="/logout">
                            <IconLogout />
                        </NavigationButton>
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
}
