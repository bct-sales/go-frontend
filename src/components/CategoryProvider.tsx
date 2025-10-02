import { CategoryContext, useCategories } from "@/categories";
import React from "react";


interface Props
{
    children: React.ReactNode
}

export default function CategoryProvider(props: Props): React.ReactNode
{
    const categoryTableStatus = useCategories();

    switch ( categoryTableStatus.status )
    {
        case 'error':
            return (
                <div>Error loading categories</div>
            );

        case 'loading':
            return (
                <>Loading</>
            );

        case 'success':
            return (
                <CategoryContext.Provider value={categoryTableStatus.value}>
                    {props.children}
                </CategoryContext.Provider>
            );
    }
}