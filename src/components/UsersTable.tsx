import { DateTime } from "@/datetime";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { NavLink } from "react-router-dom";
import DateTimeViewer from "./DateTimeViewer";
import UserIdViewer from "./UserIdViewer";
import { useEffect, useState } from "react";
import sortBy from 'lodash/sortBy';
import { Pagination, Stack } from "@mantine/core";

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
    const [ sortStatus, setSortStatus ] = useState<DataTableSortStatus<User>>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [ rows, setRows ] = useState(sortBy(users, 'id'));
    const [ page, setPage ] = useState(1);
    const rowsPerPage = 20;
    const lastPage = Math.ceil(users.length / rowsPerPage);

    useEffect(() => {
        const sortedUsers = sortBy(users, sortStatus.columnAccessor);
        if ( sortStatus.direction === 'desc' )
        {
            sortedUsers.reverse();
        }
        setRows(sortedUsers);
    }, [users, sortStatus]);

    const rowsOnPage = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <Stack>
            <Pagination value={page} onChange={setPage} total={lastPage} />
            <DataTable
                striped
                records={rowsOnPage}
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
                        sortable: true,
                    },
                    {
                        accessor: 'role',
                        title: 'Role'
                    },
                    {
                        accessor: 'itemCount',
                        title: 'Item Count',
                        sortable: true,
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
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
            />
        </Stack>
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