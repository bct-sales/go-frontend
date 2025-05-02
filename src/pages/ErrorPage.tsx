import { Button, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface Props
{
    children: React.ReactNode;
}

export default function ErrorPage(props: Props): React.ReactNode
{
    const navigate = useNavigate();

    return (
        <Stack align="center" justify="center" h="100vh">
            <h1>Something went wrong</h1>
            {props.children}
            <Button onClick={onLogout} color="red">
                Go back to login page
            </Button>
        </Stack>
    );


    function onLogout()
    {
        navigate("/login", { replace: true });
    }
}
