import React from "react";

export class Consumable
{
    private table: Map<number, number>;

    constructor(public readonly name: string)
    {
        this.table = new Map<number, number>();
    }

    addQuantityItem(quantity: number, itemId: number): void
    {
        if ( this.table.has(quantity) )
        {
            throw new Error(`Quantity already has item associated with it: quantity ${quantity} for ${this.name}`);
        }

        this.table.set(quantity, itemId);
    }

    translateQuantityToItemIds(quantity: number): number[]
    {
        let todo = quantity;
        const itemIds: number[] = [];
        const availableQuantities = [...this.table.keys()];

        // Sort in descending order
        availableQuantities.sort((x, y) => y - x);
        let index = 0;
        let q: number;

        // Greedy algorithm
        while ( todo > 0 && index < availableQuantities.length )
        {
            if ( (q = availableQuantities[index]) <= todo )
            {
                const itemId = this.table.get(q)!;
                itemIds.push(itemId);
                todo -= q;
            }

            index++;
        }

        if ( todo > 0 )
        {
            throw new Error("Failed to translate quantity to items");
        }

        return itemIds;
    }
}

export const ConsumablesContext = React.createContext<Consumable[]>([]);

export function useConsumables(): Consumable[]
{
    return React.useContext(ConsumablesContext);
}
