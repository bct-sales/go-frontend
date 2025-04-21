import { Role } from "@/role";
import { Stack, Text } from "@mantine/core";
import classes from './AuthenticationViewer.module.css';

interface Props
{
    username: number;
    role: Role;
}

export default function AuthenticationViewer(props : Props) : React.ReactNode
{
    return (
        <Stack gap="xs" className={classes.container}>
            <Text className={classes.username}>{props.username}</Text>
            <Text className={classes.role}>{props.role}</Text>
        </Stack>
    );
}