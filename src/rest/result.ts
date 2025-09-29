import { failure, Result } from "@/result";
import axios from 'axios';
import { z } from 'zod';


const ErrorTag = z.enum([
    "unknown",
    "no_such_user",
    "no_such_item",
    "no_such_sale",
    "invalid_id",
    "wrong_password",
    "wrong_role",
    "invalid_item_description",
    "missing_session_id",
    "no_such_session",
    "invalid_request",
    "invalid_uri_parameters",
    "invalid_user_id",
    "invalid_item_id",
    "invalid_sale_id",
    "wrong_user",
    "wrong_seller",
    "no_such_category",
    "item_frozen",
    "invalid_price",
    "duplicate_item_in_sale",
    "missing_items",
    "invalid_layout",
])

export type ErrorTag = z.infer<typeof ErrorTag>;


const Error = z.object({
    type: ErrorTag,
    details: z.string(),
});

export type Error = z.infer<typeof Error>;


export function identifyErrorInException(error: unknown): Error
{
    if ( axios.isAxiosError(error) && error.response )
        {
            const data = error.response.data as unknown;
            const parsed = Error.safeParse(data);

            if ( parsed.success )
            {
                return parsed.data;
            }
            else
            {
                console.error("Failed to parse error", parsed.error);
                return { type: "unknown", details: `Failed to parse error "${data}"` };
            }
        }

        console.error("An non-Axios error occurred: ", error);
        return { type: "unknown", details: "Non-Axios error: " + error };
}

export function convertExceptionToFailure<T>(error: unknown): RestResult<T>
{
    return failure(identifyErrorInException(error));
}

export type RestResult<T> = Result<T, Error>;
