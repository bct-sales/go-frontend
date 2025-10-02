import { CategoryContext, useCategories } from "@/categories";
import { Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
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
                <Alert color='red' icon={<IconExclamationCircle />}>
                    Error loading categories: {categoryTableStatus.details}
                </Alert>
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