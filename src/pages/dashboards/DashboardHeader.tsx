import AuthenticationViewer from "@/components/AuthenticationViewer";
import { Role } from "@/role";
import { Burger, Flex, Text } from "@mantine/core";
import React from "react";
import classes from './DashboardHeader.module.css';


interface Props
{
    title: string;
    userId: number;
    role: Role;
    navbarVisible: boolean;
    onToggleMenu?: () => void;
}

export default function DashboardHeader(props: Props): React.ReactNode
{
    return (
        <Flex direction="row" align="center" justify="space-between" gap="md" p="xl" style={{height: '100%'}}>
            <Burger opened={props.navbarVisible} onClick={props.onToggleMenu} />
            <Text className={classes.title}>{props.title}</Text>
            <AuthenticationViewer username={props.userId} role={props.role} />
        </Flex>
    );
}