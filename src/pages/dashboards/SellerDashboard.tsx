import { useAuthentication } from "@/authentication";
import AuthenticationViewer from "@/components/AuthenticationViewer";
import NavigationButton from "@/components/NavigationButton";
import AddItemPage from "@/pages/seller/AddItemPage";
import EditItemPage from "@/pages/seller/EditItemPage";
import GenerateLabelsPage from "@/pages/seller/GenerateLabelsPage";
import ItemsPage from "@/pages/seller/ItemsPage";
import OverviewPage from "@/pages/seller/OverviewPage";
import SettingsPage from "@/pages/seller/SettingsPage";
import { AppShell, Flex, Text } from "@mantine/core";
import { IconChartBar, IconEdit, IconHelp, IconList, IconLogout, IconPlus, IconSettings, IconTag } from "@tabler/icons-react";
import { Route, Routes } from "react-router-dom";
import RedirectToLoginPage from "@/components/RedirectToLoginPage";
import HelpPage from "../seller/HelpPage";
import DashboardHeader from "./DashboardHeader";
import { useDisclosure } from "@mantine/hooks";


export default function SellerDashboard()
{
    const authentication = useAuthentication();
    const [navbarVisible, { toggle: toggleNavbarVisibility }] = useDisclosure(true);
    const authenticated = authentication.status === 'authenticated' && authentication.role === 'seller';

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
                    <DashboardHeader title="Seller Dashboard" userId={authentication.username} role={authentication.role} onToggleMenu={toggleNavbarVisibility} navbarVisible={navbarVisible} />
                </AppShell.Header>
                <AppShell.Navbar>
                    <Flex direction="column" align="center" justify="flex-start" gap="md" m="lg" style={{height: '100%'}}>
                        <NavigationButton caption="Overview" url="/seller">
                            <IconChartBar />
                        </NavigationButton>
                        <NavigationButton caption="Items" url="/seller/items">
                            <IconList />
                        </NavigationButton>
                        <NavigationButton caption="Add Item" url="/seller/add-item">
                            <IconPlus />
                        </NavigationButton>
                        <NavigationButton caption="Edit Item" url="/seller/edit-item" onlyShowWhenActive={true}>
                            <IconEdit />
                        </NavigationButton>
                        <NavigationButton caption="Generate Labels" url="/seller/labels">
                            <IconTag />
                        </NavigationButton>
                        <NavigationButton caption="Settings" url="/seller/settings">
                            <IconSettings />
                        </NavigationButton>
                        <NavigationButton caption="Help" url="/seller/help">
                            <IconHelp />
                        </NavigationButton>
                        <NavigationButton caption="Logout" url="/logout">
                            <IconLogout />
                        </NavigationButton>
                    </Flex>
                </AppShell.Navbar>
                <AppShell.Main>
                    <Routes>
                        <Route path="/" element={<OverviewPage sellerId={authentication.username} />} />
                        <Route path="/items" element={<ItemsPage sellerId={authentication.username} />} />
                        <Route path="/add-item" element={<AddItemPage sellerId={authentication.username} />} />
                        <Route path="/edit-item" element={<EditItemPage />} />
                        <Route path="/labels" element={<GenerateLabelsPage sellerId={authentication.username} />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/help" element={<HelpPage />} />
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
