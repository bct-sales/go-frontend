import Loading from "@/components/Loading";
import UsersTable from "@/components/UsersTable";
import { listUsers, User } from "@/rest/admin/list-users";
import { RestStatus } from "@/rest/status";
import { useEffect, useState } from "react";


export default function UsersSubpage()
{
    const [status, setStatus] = useState<RestStatus<User[]>>({ status: "loading" });

    useEffect(() => {
        void (async () => {
            const response = await listUsers();

            if (response.success)
            {
                setStatus({ status: "success", value: response.value });
            }
            else
            {
                setStatus({ status: "error", tag: response.error.type, details: response.error.details });
            }
        })();
    }, []);

    switch (status.status)
    {
        case "success":
            return renderPage(status.value);

        case "loading":
            return (
                <Loading message="Loading users..." />
            );

        case "error":
            return <div className="text-center">Error: {status.tag} - {status.details}</div>;
    }


    function renderPage(users: User[]): React.ReactNode
    {
        return (
            <>
                <UsersTable users={users} />
            </>
        );
    }
}
