import { z } from 'zod';


export const DateTime = z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
});

export type DateTime = z.infer<typeof DateTime>;
