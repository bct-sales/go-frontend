export function convertToCsv<T extends Record<Key, string>, Key extends PropertyKey>(headers: Array<Key>, items: Array<T>): Array<string>
{
    const rows: Array<string> = [];

    const headerRow = headers.map(h => escape(h.toString())).join(',');
    rows.push(headerRow);

    for ( const item of items )
    {
        const row = headers.map(h => escape(item[h])).join(',');
        rows.push(row);
    }

    return rows;
}

function escape(s: string): string
{
    if ( /[,"]/.test(s) )
    {
        return '"' + s.replace(/"/g, '""') + '"';
    }
    else
    {
        return s;
    }
}
