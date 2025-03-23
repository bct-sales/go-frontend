import { z } from 'zod';


export const Timestamp = z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
    hour: z.number(),
    minute: z.number(),
    second: z.number(),
});

export type Timestamp = z.infer<typeof Timestamp>;
