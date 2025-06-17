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

export function replaceAtIndex<T>(array: T[], index: number, value: T): T[]
{
    if (index < 0 || index >= array.length)
    {
        throw new RangeError(`Index ${index} is out of bounds for array of length ${array.length}`);
    }

    const newArray = [...array];
    newArray[index] = value;

    return newArray;
}
