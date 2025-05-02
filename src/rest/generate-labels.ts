import { success } from '@/result';
import axios from 'axios';
import { convertExceptionToFailure, RestResult } from './result';


export async function generateLabels(sellerId: number): Promise<RestResult<Blob>>
{
    const url = `/api/v1/sellers/${sellerId}/labels`;
    const payload = {};

    try
    {
        const response = await axios.post<BlobPart>(url, payload, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/pdf' });

        return success(blob);
    }
    catch ( exception: unknown )
    {
        return convertExceptionToFailure(exception);
    }
}
