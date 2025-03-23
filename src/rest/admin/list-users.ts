import axios from 'axios';
import { z } from 'zod';
import { createErrorExtractor, extractDetailFromException, ForbiddenError, forbiddenErrorTag, UnknownError, unknownErrorTag } from '../errors';
import { paths } from '../paths';
import { Timestamp } from '../datetime';


const User = z.object({
    id: z.number(),
    password: z.string(),
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
    created_at: Timestamp,
});

export type User = z.infer<typeof User>;


const SuccessResponse = z.object({
    users: z.array(User),
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


export async function listUsers(): Promise<User[] | undefined>
{
    const url = paths.users;

    try
    {
        const response = await axios.get<unknown>(url);
        const data = SuccessResponse.parse(response.data);

        return data.users;
    }
    catch ( error: unknown )
    {
        const detail = extractError(error);

        switch ( detail.type )
        {
            case unknownErrorTag:
                console.error(detail.details);
                return undefined;

            case forbiddenErrorTag:
                console.error(detail.details);
                return undefined;
        }
    }
}
