export function range(start: number, end: number): number[]
{
    const result: number[] = [];

    for (let i = start; i < end; i++)
    {
        result.push(i);
    }

    return result;
}

export function count<T>(elements: T[], predicate: (element: T) => boolean): number
{
    let count = 0;

    for (const element of elements)
    {
        if (predicate(element))
        {
            ++count;
        }
    }

    return count;
}