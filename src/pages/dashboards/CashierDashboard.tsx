import { useAuthentication } from "@/authentication";
import AuthenticationViewer from "@/components/AuthenticationViewer";
import NavigationButton from "@/components/NavigationButton";
import AddSalePage from "@/pages/cashier/AddSalePage";
import { AppShell, Flex, Stack, Text } from "@mantine/core";
import { IconCashRegister, IconLogout } from "@tabler/icons-react";
import { Route, Routes } from "react-router-dom";
import classes from './CashierDashboard.module.css';


export default function CashierDashboard()
{
    const authentication = useAuthentication();

    if ( authentication.status !== 'authenticated' || authentication.role !== 'cashier' )
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
                        <Text className={classes.header}>Cashier Dashboard</Text>
                        <AuthenticationViewer username={authentication.username} role={authentication.role} />
                    </Flex>
                </AppShell.Header>
                <AppShell.Navbar>
                    <Flex direction="column" align="center" justify="flex-start" gap="md" m="lg" style={{height: '100%'}}>
                        <NavigationButton caption="Overview" url="/cashier">
                            <IconCashRegister />
                        </NavigationButton>
                        <NavigationButton caption="Logout" url="/logout">
                            <IconLogout />
                        </NavigationButton>
                    </Flex>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<AddSalePage />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
