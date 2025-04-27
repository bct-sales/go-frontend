import { useAuthentication } from "@/authentication";
import ItemsTable from "@/components/ItemsTable";
import { Item, listSellerItems } from "@/rest/list-seller-items";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type State =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; items: Item[] };


export default function ItemsSubpage() : React.ReactNode
{
    const [state, setState] = useState<State>({ status: 'loading' });
    const authentication = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        void (async () => {
            if (authentication.status !== 'authenticated' || authentication.role !== 'seller')
            {
                navigate('/login');
                return;
            }

            const response = await listSellerItems(authentication.username);

            if (response.success)
            {
                setState({ status: 'success', items: response.value.items });
            }
            else
            {
                setState({ status: 'error', error: response.error.details });
            }
        })();
    }, [authentication, navigate]);

    switch (state.status)
    {
        case 'loading':
            return <div>Loading...</div>;
        case 'error':
            return <div>Error: {state.error}</div>;
        case 'success':
            return renderItems(state.items);
    }


    function renderItems(items: Item[]): React.ReactNode
    {
        return (
            <ItemsTable items={items} />
        );
    }
}
