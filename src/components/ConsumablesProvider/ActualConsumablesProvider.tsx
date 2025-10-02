import { useCategoryContext } from "@/categories";
import { Consumable, ConsumablesContext } from "@/consumables";
import { listItemsInCategory } from "@/rest/list-items-in-category";
import { RestStatus } from "@/rest/status";
import React from "react";
import Loading from "../Loading";


interface Props
{
    children: React.ReactNode;
}

type ExtendedRestStatus =
    | RestStatus<Consumable[]>
    | { status: 'no-consumable-category' }
    | { status: 'invalid-consumable-description', description: string };

export default function ActualConsumablesProvider(props: Props): React.ReactNode
{
    const categoryTable = useCategoryContext();
    const [consumablesStatus, setConsumablesStatus] = React.useState<ExtendedRestStatus>({ status: 'loading' });

    React.useEffect(() => {
        void (async () => {
            const consumableCategoryId = categoryTable.categoryIds.find(id => categoryTable.categoryName(id) === 'Consumable');

            if ( !consumableCategoryId )
            {
                setConsumablesStatus({status: 'no-consumable-category'})
                return;
            }

            const data = await listItemsInCategory(consumableCategoryId);

            if ( data.success )
            {
                const items = data.value.items;
                const table = new Map<string, Consumable>();
                const regex = /^(.*) \((\d+)\)$/;

                for ( const item of items )
                {
                    console.debug(`Processing consumable item "${item.description}" with id ${item.itemId}`);

                    const match = regex.exec(item.description);

                    if ( !match )
                    {
                        setConsumablesStatus({status: 'invalid-consumable-description', description: item.description});
                        return;
                    }

                    const name = match[1];
                    const quantity = parseInt(match[2]);

                    if ( !table.has(name) )
                    {
                        table.set(name, new Consumable(name));
                    }

                    table.get(name)!.addQuantityItem(quantity, item.itemId);
                }

                const consumables = [...table.values()];
                setConsumablesStatus( {status: 'success', value: consumables} );
            }
            else
            {
                setConsumablesStatus({ status: 'error', tag: data.error.type, details: data.error.details });
            }
        })();
    }, [categoryTable]);

    switch ( consumablesStatus.status )
    {
        case 'error':
            return (
                <div>Error loading consumables</div>
            );

        case 'no-consumable-category':
            return (
                <div>No consumables category found</div>
            );

        case 'invalid-consumable-description':
            return (
                <div>Invalid consumable description: {consumablesStatus.description}</div>
            );

        case 'loading':
            return (
                <Loading />
            );

        case 'success':
            return (
                <ConsumablesContext.Provider value={consumablesStatus.value}>
                    {props.children}
                </ConsumablesContext.Provider>
            );
    }
}