import { useAuthentication } from "@/authentication";
import { Alert, Button, Stack } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from './ErrorPage.module.css';


interface Props
{
    children: React.ReactNode;
}

export default function ErrorPage(props: Props): React.ReactNode
{
    const authentication = useAuthentication();
    const navigate = useNavigate();
    const alertIcon = <IconAlertTriangle />;

    return (
        <Stack align="center" justify="center">
            <Alert icon={alertIcon} color='red' title="An error occurred" w='50%' className={classes.alert}>
                Please contact the site administrator and provide them with the information shown below.
            </Alert>
            {props.children}
            <Button onClick={onLogout} color="red">
                Go back to login page
            </Button>
        </Stack>
    );


    function onLogout()
    {
        if (authentication.status === 'authenticated')
        {
            authentication.logout();
        }

        navigate("/login", { replace: true });
    }
}
