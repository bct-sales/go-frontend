import axios from 'axios';


export interface Parser<T>
{
    safeParse: (data: unknown) => { success: true, data: T } | { success: false, error: unknown };
}

export function extractDetailFromException<T>(error: unknown, parser : Parser<T>, unknownError : T): T
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
            return unknownError;
        }
    }

    return unknownError;
}

export function createErrorExtractor<T>(parser : Parser<T>, unknownError : T) : (error : unknown) => T
{
    return (error: unknown) => extractDetailFromException(error, parser, unknownError);
}
