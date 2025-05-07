import { success } from '@/result';
import axios from 'axios';
import { convertExceptionToFailure, RestResult } from './result';


interface Payload
{
    itemIds: number[];
}

export async function generateLabels(payload: Payload): Promise<RestResult<Blob>>
{
    const url = `/api/v1/labels`;

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
