import { useCategoryContext } from "@/categories";
import { Consumable, ConsumablesContext } from "@/consumables";
import { listItemsInCategory } from "@/rest/list-items-in-category";
import { RestStatus } from "@/rest/status";
import { notifications } from "@mantine/notifications";
import React from "react";
import Loading from "@/components/Loading";
import { Alert, Tooltip } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";


interface Props
{
    children: React.ReactNode;
}

type ExtendedRestStatus =
    | RestStatus<Consumable[]>
    | { status: 'no-consumable-category' };


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
                let errorCount = 0;

                console.group('Looking for consumable items');

                try
                {
                    for ( const item of items )
                    {
                        console.debug(`Processing consumable item "${item.description}" with id ${item.itemId}`);

                        const match = regex.exec(item.description);

                        if ( !match )
                        {
                            console.error(`Could not process item ${item.itemId} %O, whose description "${item.description}" should follow the pattern "... (n)".\nSkipping this item.`, item);
                            errorCount++;
                            continue;
                        }

                        const name = match[1];
                        const quantity = parseInt(match[2]);

                        if ( !table.has(name) )
                        {
                            table.set(name, new Consumable(name));
                        }

                        table.get(name)!.addQuantityItem(quantity, item.itemId);
                    }

                    if ( errorCount > 0 )
                    {
                        notifications.show({
                            title: `${errorCount} error(s) occurred while looking for consumables`,
                            message: 'See console for more information',
                            color: 'red',
                        });
                    }

                    const consumables = [...table.values()];
                    setConsumablesStatus( {status: 'success', value: consumables} );
                }
                finally
                {
                    console.groupEnd();
                }
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
                <Alert color='red' icon={<IconExclamationCircle />}>
                    An error occurred while fetching items from the server.
                </Alert>
            );

        case 'no-consumable-category':
            console.error(`In order for consumables detection to work, an item category named "Consumable" must exist.\nCategories that were found:\n${categoryTable.categoryNames().join("\n")}`);
            return (
                <Tooltip label={`In order for consumables detection to work, an item category named "Consumable" must exist.`}>
                    <Alert color='red' icon={<IconExclamationCircle />}>
                        No consumables category found
                    </Alert>
                </Tooltip>
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
