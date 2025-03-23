import axios from 'axios';
import { z } from 'zod';
import { createErrorExtractor, ForbiddenError, UnknownError } from '../errors';
import { paths } from '../paths';
import { Timestamp as DateTime } from '../datetime';
import { failure, Result, success } from '@/result';


const Item = z.object({
	itemId: z.number(),
	addedAt: DateTime,
	description: z.string(),
	priceInCents: z.number(),
	categoryId: z.number(),
	sellerId: z.number(),
	donation: z.boolean(),
	charity: z.boolean(),
});

export type Item = z.infer<typeof Item>;


const SuccessResponse = z.object({
    items: z.array(Item),
})

type SuccessResponse = z.infer<typeof SuccessResponse>;

const FailureResponse = z.discriminatedUnion("type",
    [
        ForbiddenError,
        UnknownError,
    ]
);

type FailureResponse = z.infer<typeof FailureResponse>;

const extractError = createErrorExtractor<FailureResponse>(FailureResponse, (message : string) => ({ type: "unknown", details: message }));

export enum Error
{
    Forbidden,
    Unknown
}

export async function listItems(): Promise<Result<Item[], Error>>
{
    const url = paths.items;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return success(data.items);
    }
    catch ( error: unknown )
    {
        console.log(error);
        const detail = extractError(error);

        switch (detail.type)
        {
            case 'forbidden':
                console.error(detail.details);
                return failure(Error.Forbidden);

            case 'unknown':
                console.error(detail.details);
                return failure(Error.Unknown);
        }
    }
}
