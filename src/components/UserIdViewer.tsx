import { NavLink } from "react-router-dom";

interface Props
{
    userId: number;
}

export default function UserIdViewer(props: Props) : React.ReactNode
{
    return (
        <NavLink to={determineUserUrl(props.userId)}>{props.userId}</NavLink>
    )


    function determineUserUrl(userId: number): string
    {
        return `/admin/users/${userId}`;
    }
}
