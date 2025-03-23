import axios from 'axios';
import { z } from 'zod';
import { createErrorExtractor, ForbiddenError, UnknownError } from '../errors';
import { paths } from '../paths';
import { Timestamp } from '../timestamp';


const Item = z.object({
	itemId: z.number(),
	addedAt: Timestamp,
	description: z.string(),
	priceInCents: z.number(),
	categoryId: z.number(),
	sellerId: z.number(),
	donation: z.boolean(),
	charity: z.boolean(),
});

export type Item = z.infer<typeof Item>;


const ListItemsSuccessResponse = z.object({
    items: z.array(Item),
})

type ListItemsSuccessResponse = z.infer<typeof ListItemsSuccessResponse>;

const ListItemsFailureResponse = z.discriminatedUnion("type",
    [
        ForbiddenError,
        UnknownError,
    ]
);

type ListItemsFailureResponse = z.infer<typeof ListItemsFailureResponse>;

const extractError = createErrorExtractor(ListItemsFailureResponse, (message : string) => ({ type: "unknown", details: message }));


export async function listItems(): Promise<Item[] | undefined>
{
    const url = paths.items;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = ListItemsSuccessResponse.parse(response.data);

        return data.items;
    }
    catch ( error: unknown )
    {
        console.log(error);
        const detail = extractError(error);

        if ( detail !== null )
        {
            return undefined;
        }
        else
        {
            console.error(error);
            return undefined;
        }
    }
}
