import { Role } from '@/role';
import axios from 'axios';
import { z } from 'zod';
import { createErrorExtractor } from './errors';
import { paths } from './paths';



const LoginParameters = z.object({
    userId: z.number(),
    password: z.string(),
});

export type LoginParameters = z.infer<typeof LoginParameters>;


const LoginSuccessResponse = z.object({
    role: z.union([z.literal('seller'), z.literal('admin'), z.literal('cashier')]),
}).strict();

type LoginSuccessResponse = z.infer<typeof LoginSuccessResponse>;

const LoginFailureResponse = z.discriminatedUnion("type",
    [
        z.object({
            type: z.literal("invalid_id"),
            details: z.string(),
        }),
        z.object({
            type: z.literal("unknown_user"),
            details: z.string(),
        }),
        z.object({
            type: z.literal("wrong_password"),
            details: z.string(),
        }),
        z.object({
            type: z.literal("unknown")
        })
    ]
);

type LoginFailureResponse = z.infer<typeof LoginFailureResponse>;

const extractError = createErrorExtractor(LoginFailureResponse, { type: "unknown" });

export async function login( data: LoginParameters ): Promise<Role | undefined>
{
    const payload = {
        grant_type: 'password',
        username: `${data.userId}`,
        password: data.password
    };
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const url = paths.login;

    try
    {
        const response = await axios.post<unknown>( url, payload, { headers } );
        const data = LoginSuccessResponse.parse(response.data);

        return data.role;
    }
    catch ( error: unknown )
    {
        const errorData = extractError(error);

        switch ( errorData.type )
        {
            case "invalid_id":
                console.error("Invalid ID", errorData.details);
                return undefined;
            case "unknown_user":
                console.error("Unknown user", errorData.details);
                return undefined;
            case "wrong_password":
                console.error("Invalid password", errorData.details);
                return undefined;
            default:
                console.error(`Unknown error: ${errorData}`, error);
                return undefined;
        }
    }
}
