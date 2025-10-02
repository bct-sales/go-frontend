import React from "react";
import CategoryProvider from "../CategoryProvider";
import ActualConsumablesProvider from "./ActualConsumablesProvider";


interface Props
{
    children: React.ReactNode;
}

export default function ConsumablesProvider(props: Props): React.ReactNode
{
    return (
        <CategoryProvider>
            <ActualConsumablesProvider>
                {props.children}
            </ActualConsumablesProvider>
        </CategoryProvider>
    );
}
