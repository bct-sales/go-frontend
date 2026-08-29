import React from 'react';
import CategoryProvider from '@/components/CategoryProvider';
import ActualConsumablesProvider from './ActualConsumablesProvider';


interface Props
{
    children: React.ReactElement;
}

export default function ConsumablesProvider(props: Props): React.ReactElement
{
    return (
        <CategoryProvider>
            <ActualConsumablesProvider>
                {props.children}
            </ActualConsumablesProvider>
        </CategoryProvider>
    );
}
