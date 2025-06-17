import { useAuthentication } from "@/authentication";
import AuthenticationViewer from "@/components/AuthenticationViewer";
import NavigationButton from "@/components/NavigationButton";
import { AppShell, Flex, Stack, Text } from "@mantine/core";
import { IconChartBar, IconEdit, IconList, IconLogout, IconPlus, IconSettings, IconTag } from "@tabler/icons-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddItemPage from "@/pages/seller/AddItemPage";
import EditItemPage from "@/pages/seller/EditItemPage";
import ItemsPage from "@/pages/seller/ItemsPage";
import OverviewPage from "@/pages/seller/OverviewPage";
import SettingsPage from "@/pages/seller/SettingsPage";
import GenerateLabelsPage from "@/pages/seller/GenerateLabelsPage";
import classes from './SellerDashboard.module.css';
import { useEffect } from "react";


export default function SellerDashboard()
{
    const authentication = useAuthentication();
    const navigate = useNavigate();
    const authenticated = authentication.status === 'authenticated' && authentication.role === 'seller';

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
                        <Text className={classes.header}>Seller Dashboard</Text>
                        <AuthenticationViewer username={authentication.username} role={authentication.role} />
                    </Flex>
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
                    </Routes>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
