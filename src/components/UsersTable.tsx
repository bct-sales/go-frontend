import { DateTime } from "@/datetime";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { NavLink } from "react-router-dom";
import DateTimeViewer from "./DateTimeViewer";
import UserIdViewer from "./UserIdViewer";
import { useEffect, useState } from "react";
import sortBy from 'lodash/sortBy';
import { Pagination, Stack } from "@mantine/core";
import classes from './UsersTable.module.css';


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
        <Stack className={classes.container}>
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
                        width: 40,
                    },
                    {
                        accessor: 'role',
                        title: 'Role',
                        width: 100,
                    },
                    {
                        accessor: 'itemCount',
                        title: '#Items',
                        sortable: true,
                        width: 70,
                    },
                    {
                        accessor: 'createdAt',
                        title: 'Created At',
                        render: (user: User) => <DateTimeViewer dateTime={user.createdAt} />,
                        width: 160,
                    },
                    {
                        accessor: 'lastActivity',
                        title: 'Last Activity',
                        render: (user: User) => renderLastActivity(user.lastActivity),
                        width: 160,
                    },
                    {
                        accessor: 'password',
                        title: 'Password',
                        width: 80,
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