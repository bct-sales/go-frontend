import { useAuthentication } from "@/authentication";
import { Alert, Button, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props
{
    children: React.ReactNode;
}

export default function ErrorPage(props: Props): React.ReactNode
{
    const authentication = useAuthentication();
    const navigate = useNavigate();

    return (
        <Stack align="center" justify="center">
            <Alert title="Error" color="red">
                {props.children}
            </Alert>
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
