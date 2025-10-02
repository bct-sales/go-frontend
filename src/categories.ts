import { useQuery } from "@tanstack/react-query";
import { Category, getItemCategories } from "./rest/categories";
import { RestStatus } from "./rest/status";
import { failure, success } from "./result";
import { RestResult } from "./rest/result";
import React from "react";


export interface CategoryTable
{
    get categoryIds(): number[];

    categoryName(id: number): string;
}

export function useCategories(): RestStatus<CategoryTable>
{
    const query = useQuery(
        {
            queryKey: ['categories'],
            queryFn: performQuery,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60,
        });

    if ( query.data === undefined )
    {
        return { status: 'loading' };
    }

    if ( query.data.success )
    {
        return { status: 'success', value: query.data.value };
    }
    else
    {
        return { status: 'error', tag: query.data.error.type, details: query.data.error.details};
    }


    async function performQuery(): Promise<RestResult<CategoryTable>>
    {
        const restResult = await getItemCategories();

        if ( restResult.success )
        {
            const categories = restResult.value.categories;

            return success(buildCategoryTable(categories));
        }
        else
        {
            return failure(restResult.error);
        }
    }
}


function buildCategoryTable(categories: Category[]): CategoryTable
{
    return { categoryIds: categoryIds(), categoryName };


    function categoryIds(): number[]
    {
        return categories.map((category) => category.categoryId);
    }

    function categoryName(id: number): string
    {
        const category = categories.find((category) => category.categoryId === id);

        if ( category )
        {
            return category.categoryName;
        }
        else
        {
            throw new Error("No such category: " + id);
        }
    }
}


export const CategoryContext = React.createContext<CategoryTable>(buildCategoryTable([]));

export function useCategoryContext(): CategoryTable
{
    return React.useContext(CategoryContext);
}