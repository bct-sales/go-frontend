import { useAuthentication } from "@/authentication";
import AuthenticationViewer from "@/components/AuthenticationViewer";
import NavigationButton from "@/components/NavigationButton";
import AddSalePage from "@/pages/cashier/AddSalePage";
import SalesPage from "@/pages/cashier/SalesPage";
import { AppShell, Flex, Stack, Text } from "@mantine/core";
import { IconCashRegister, IconList, IconLogout } from "@tabler/icons-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import classes from './CashierDashboard.module.css';
import { useEffect } from "react";


export default function CashierDashboard()
{
    const authentication = useAuthentication();
    const navigate = useNavigate();
    const authenticated = authentication.status === 'authenticated' && authentication.role === 'cashier';

    useEffect(() => {
        if ( !authenticated )
        {
            if ( authentication.status === 'authenticated' )
            {
                authentication.logout();
            }

            navigate('/login');
        }
    });

    if ( !authenticated  )
    {
        return (
            <Stack>
                Redirecting...
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
                        <NavigationButton caption="Add Sale" url="/cashier">
                            <IconCashRegister />
                        </NavigationButton>
                        <NavigationButton caption="View Sales" url="/cashier/sales">
                            <IconList />
                        </NavigationButton>
                        <NavigationButton caption="Logout" url="/logout">
                            <IconLogout />
                        </NavigationButton>
                    </Flex>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<AddSalePage />} />
                        <Route path="/sales" element={<SalesPage cashierId={authentication.username} />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
