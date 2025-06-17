import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Delayed from "./Delayed";
import { Text } from "@mantine/core";


export default function RedirectToLoginPage(): React.ReactNode
{
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    });

    return (
        <>
            <Delayed delayInMilliseconds={500}>
                <Text>
                    Redirecting to login page...
                </Text>
            </Delayed>
        </>
    );
}