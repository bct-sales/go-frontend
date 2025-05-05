import { ActionIcon } from "@mantine/core";
import { useNavigate } from "react-router-dom";


interface Props
{
    caption: string;
    url: string;
    children: React.ReactNode;
}

export default function NavigationButton(props: Props): React.ReactNode
{
    const navigate = useNavigate();
    const isActive = props.url === location.pathname;

    return (
        <ActionIcon onClick={onClick} title={props.caption} size={64} variant={isActive ? 'filled' : 'light'}>
            {props.children}
        </ActionIcon>
    );


    function onClick(): void
    {
        navigate(props.url);
    }
}