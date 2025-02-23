import { Role } from '@/role';
import axios from 'axios';
import { z } from 'zod';
import { createErrorExtractor } from './errors';
import { paths } from './paths';
import { failure, Result, success } from '@/result';



const LoginParameters = z.object({
    userId: z.number(),
    password: z.string(),
});

export type LoginParameters = z.infer<typeof LoginParameters>;


const LoginSuccessResponse = z.object({
    role: z.union([
        z.literal('seller'),
        z.literal('admin'),
        z.literal('cashier')
    ]),
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

export enum LoginError {
    InvalidId,
    UnknownUser,
    WrongPassword,
    Unknown
}

export async function login( data: LoginParameters ): Promise<Result<Role, LoginError>>
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

        return success(data.role);
    }
    catch ( error: unknown )
    {
        const errorData = extractError(error);

        switch ( errorData.type )
        {
            case "invalid_id":
                return failure(LoginError.InvalidId);
            case "unknown_user":
                return failure(LoginError.UnknownUser);
            case "wrong_password":
                return failure(LoginError.WrongPassword);
            default:
                return failure(LoginError.Unknown);
        }
    }
}
