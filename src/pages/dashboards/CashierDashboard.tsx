import { useAuthentication } from "@/authentication";
import NavigationButton from "@/components/NavigationButton";
import RedirectToLoginPage from "@/components/RedirectToLoginPage";
import AddSalePage from "@/pages/cashier/AddSalePage";
import SalesPage from "@/pages/cashier/SalesPage";
import { AppShell, Flex } from "@mantine/core";
import { IconCashRegister, IconCoffee, IconList, IconLogout, IconSettings } from "@tabler/icons-react";
import { Route, Routes } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import { useDisclosure } from "@mantine/hooks";
import SettingsPage from "../cashier/SettingsPage";
import AddConsumablesSalePage from "../cashier/AddConsumablesSalePage";
import { useSettings } from "@/settings";
import ShowIf from "@/components/ShowIf";


export default function CashierDashboard()
{
    const authentication = useAuthentication();
    const [navbarVisible, { toggle: toggleNavbarVisibility }] = useDisclosure(true);
    const settings = useSettings();
    const authenticated = authentication.status === 'authenticated' && authentication.role === 'cashier';


    if ( !authenticated )
    {
        return (
            <RedirectToLoginPage />
        );
    }

    return (
        <>
            <AppShell navbar={{width: 100, breakpoint: 'sm', collapsed: {desktop: !navbarVisible, mobile: !navbarVisible}}} header={{height: 100}}>
                <AppShell.Header>
                    <DashboardHeader title="Cashier Dashboard" userId={authentication.username} role={authentication.role} onToggleMenu={toggleNavbarVisibility} navbarVisible={navbarVisible} />
                </AppShell.Header>
                <AppShell.Navbar>
                    <Flex direction="column" align="center" justify="flex-start" gap="md" m="lg" style={{height: '100%'}}>
                        <NavigationButton caption="Add Sale" url="/cashier">
                            <IconCashRegister />
                        </NavigationButton>
                        <ShowIf show={settings.showConsumables}>
                            <NavigationButton caption="Add Consumable Sale" url="/cashier/consumables">
                                <IconCoffee />
                            </NavigationButton>
                        </ShowIf>
                        <NavigationButton caption="View Sales" url="/cashier/sales">
                            <IconList />
                        </NavigationButton>
                        <NavigationButton caption="Settings" url="/cashier/settings">
                            <IconSettings />
                        </NavigationButton>
                        <NavigationButton caption="Logout" url="/logout">
                            <IconLogout />
                        </NavigationButton>
                    </Flex>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<AddSalePage />} />
                        <Route path="/consumables" element={<AddConsumablesSalePage />} />
                        <Route path="/sales" element={<SalesPage cashierId={authentication.username} />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
