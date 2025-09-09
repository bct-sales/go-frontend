import { DateTime } from "@/datetime";
import { DataTable } from "mantine-datatable";
import { NavLink } from "react-router-dom";
import DateTimeViewer from "./DateTimeViewer";
import UserIdViewer from "./UserIdViewer";

interface Props
{
    users: User[];
}

interface User
{
    id: number;
    role: 'seller' | 'admin' | 'cashier';
    password: string;
    createdAt: DateTime;
    lastActivity?: DateTime;
    itemCount: number;
}

export default function UsersTable(props: Props): React.ReactNode
{
    const { users } = props;

    return (
        <DataTable
            striped
            records={users}
            highlightOnHover
            height="calc(100vh - 200px)"
            columns={[
                {
                    accessor: 'id',
                    title: 'Id',
                    render: (user: User) => (
                        <NavLink to={`/admin/users/${user.id}`}>
                            <UserIdViewer userId={user.id} />
                        </NavLink>
                    ),
                },
                {
                    accessor: 'role',
                    title: 'Role'
                },
                {
                    accessor: 'itemCount',
                    title: 'Item Count'
                },
                {
                    accessor: 'createdAt',
                    title: 'Created At',
                    render: (user: User) => <DateTimeViewer dateTime={user.createdAt} />,
                },
                {
                    accessor: 'lastActivity',
                    title: 'Last Activity',
                    render: (user: User) => renderLastActivity(user.lastActivity),
                },
                {
                    accessor: 'password',
                    title: 'Password'
                },
            ]}
        />
    );


    function renderLastActivity(lastActivity: User['lastActivity']): React.ReactNode
    {
        if (lastActivity === undefined)
        {
            return (
                <span>NA</span>
            );
        }
        else
        {
            return (
                <DateTimeViewer dateTime={lastActivity} />
            );
        }
    }
}