import axios from 'axios';
import { string, z } from 'zod';


export interface Parser<T>
{
    safeParse: (data: unknown) => { success: true, data: T } | { success: false, error: unknown };
}

export function extractDetailFromException<T>(error: unknown, parser : Parser<T>, createUnknownError : (message : string) => T): T
{
    if ( axios.isAxiosError(error) && error.response )
    {
        const data = error.response.data as unknown;
        const parsed = parser.safeParse(data);

        if ( parsed.success )
        {
            return parsed.data;
        }
        else
        {
            console.error("Failed to parse error", parsed.error);
            return createUnknownError(error.message);
        }
    }

    return createUnknownError("Non-Axios error: " + error);
}

export function createErrorExtractor<T extends Error>(parser: Parser<T>, createUnknownError : (message : string) => T): (error: unknown) => T
{
    return (error: unknown) => extractDetailFromException(error, parser, createUnknownError);
}

export const Error = z.object({
    type: z.string(),
    details: z.string(),
});

export type Error = z.infer<typeof Error>;

export const unknownErrorTag = "unknown";
export const noSuchUserErrorTag = 'unknown_user';
export const invalidIdErrorTag = 'invalid_id';
export const wrongPasswordErrorTag = 'wrong_password';
export const forbiddenErrorTag = 'forbidden';

export const UnknownError = Error.extend({
    type: z.literal(unknownErrorTag),
});

export const NoSuchUserError =
    Error.extend({
        type: z.literal(noSuchUserErrorTag),
    });

export const InvalidIdError =
    Error.extend({
        type: z.literal(invalidIdErrorTag),
    });

export const WrongPasswordError =
    Error.extend({
        type: z.literal(wrongPasswordErrorTag),
    });

export const ForbiddenError =
    Error.extend({
        type: z.literal(forbiddenErrorTag),
    });

export type UnknownError = z.infer<typeof UnknownError>;
export type NoSuchUserError = z.infer<typeof NoSuchUserError>;
export type InvalidIdError = z.infer<typeof InvalidIdError>;
export type WrongPasswordError = z.infer<typeof WrongPasswordError>;
export type ForbiddenError = z.infer<typeof ForbiddenError>;
