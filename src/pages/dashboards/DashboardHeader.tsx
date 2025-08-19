import AuthenticationViewer from "@/components/AuthenticationViewer";
import { Role } from "@/role";
import { Flex, Text } from "@mantine/core";
import React from "react";
import classes from './DashboardHeader.module.css'


interface Props
{
    title: string;
    userId: number;
    role: Role;
}

export default function DashboardHeader(props: Props): React.ReactNode
{
    return (
        <Flex direction="row" align="center" justify="space-between" gap="md" p="xl" style={{height: '100%'}}>
            <Text className={classes.title}>{props.title}</Text>
            <AuthenticationViewer username={props.userId} role={props.role} />
        </Flex>
    );
}