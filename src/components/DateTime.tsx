interface Props
{
    dateTime: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
}

export default function DateTime(props: Props): React.ReactNode
{
    const { dateTime } = props;

    return (
        <span>
            {dateTime.year}-{pad(dateTime.month)}-{pad(dateTime.day)} {pad(dateTime.hour)}:{pad(dateTime.minute)}:{pad(dateTime.second)}
        </span>
    );


    function pad(n : number)
    {
        return n.toString().padEnd(2, '0');
    }
}
