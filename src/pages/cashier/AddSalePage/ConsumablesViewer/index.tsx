import React from "react";
import ActualConsumablesViewer from "./ActualConsumablesViewer";
import ConsumablesProvider from "@/components/ConsumablesProvider";


interface Props
{
    onAddItem: (itemId: number) => void;
}

export default function ConsumablesViewer(props: Props): React.ReactNode
{
    return (
        <ConsumablesProvider>
            <ActualConsumablesViewer onAddItem={props.onAddItem} />
        </ConsumablesProvider>
    );
}