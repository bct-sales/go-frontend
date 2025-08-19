import { useAuthentication } from "@/authentication";
import NavigationButton from "@/components/NavigationButton";
import RedirectToLoginPage from "@/components/RedirectToLoginPage";
import AddSalePage from "@/pages/cashier/AddSalePage";
import SalesPage from "@/pages/cashier/SalesPage";
import { AppShell, Flex } from "@mantine/core";
import { IconCashRegister, IconList, IconLogout } from "@tabler/icons-react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";


export default function CashierDashboard()
{
    const authentication = useAuthentication();
    const authenticated = authentication.status === 'authenticated' && authentication.role === 'cashier';

    if ( !authenticated )
        {
            return (
                <RedirectToLoginPage />
            );
        }

    return (
        <>
            <AppShell navbar={{width: 100, breakpoint: 'sm', collapsed: {mobile: true}}} header={{height: 100}}>
                <AppShell.Header>
                    <DashboardHeader title="Cashier Dashboard" userId={authentication.username} role={authentication.role} />
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
