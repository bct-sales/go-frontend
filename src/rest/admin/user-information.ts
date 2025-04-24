import axios from 'axios';
import { z } from 'zod';
import { convertExceptionToFailure, RestResult } from '@/rest/result';
import { paths } from '@/rest/paths';
import { DateTime } from '@/datetime';
import { success } from '@/result';


const ItemInformation = z.object({
    item_id: z.number(),
    added_at: DateTime,
    seller_id: z.number(),
    description: z.string(),
    price_in_cents: z.number().positive(),
    category_id: z.number(),
    charity: z.boolean(),
    donation: z.boolean(),
    frozen: z.boolean(),
    sale_count: z.number().nonnegative(),
});

type ItemInformation = z.infer<typeof ItemInformation>;


const SaleInformation = z.object({
    sale_id: z.number(),
    transaction_time: DateTime,
});

type SaleInformation = z.infer<typeof SaleInformation>;


const BasicUserInformation = z.object({
    user_id: z.number(),
    role: z.enum(['admin', 'seller', 'cashier']),
    password: z.string(),
    created_at: DateTime,
    last_activity: z.optional(DateTime),
})

type BasicUserInformation = z.infer<typeof BasicUserInformation>;


const SellerUserInformation = BasicUserInformation.extend({
    role: z.literal('seller'),
    items: z.array(ItemInformation),
})

export type SellerUserInformation = z.infer<typeof SellerUserInformation>;


const AdminUserInformation = BasicUserInformation.extend({
    role: z.literal('admin'),
})

export type AdminUserInformation = z.infer<typeof AdminUserInformation>;


const CashierUserInformation = BasicUserInformation.extend({
    role: z.literal('cashier'),
    sales: z.array(SaleInformation),
})

export type CashierUserInformation = z.infer<typeof CashierUserInformation>;


const UserInformation = z.discriminatedUnion('role', [SellerUserInformation, AdminUserInformation, CashierUserInformation])

export type UserInformation = z.infer<typeof UserInformation>;


const SuccessResponse = UserInformation;

export type SuccessResponse = z.infer<typeof SuccessResponse>;


export async function getUserInformation(userId: number): Promise<RestResult<SuccessResponse>>
{
    const url = paths.user(userId);

    try
    {
        const response = await axios.get<unknown>(url);
        console.log("received", response);
        const data = SuccessResponse.parse(response.data);

        return success(data);
    }
    catch ( exception: unknown )
    {
        console.error(exception);
        return convertExceptionToFailure(exception);
    }
}
