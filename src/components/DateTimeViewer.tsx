import { DateTime } from "@/datetime";

interface Props
{
    dateTime: DateTime;
}

export default function DateTimeViewer(props: Props): React.ReactNode
{
    const { dateTime } = props;

    if (dateTime === undefined)
    {
        return (
            <span>NA</span>
        );
    }

    return (
        <span>
            {dateTime.year}-{pad(dateTime.month)}-{pad(dateTime.day)} {pad(dateTime.hour)}:{pad(dateTime.minute)}:{pad(dateTime.second)}
        </span>
    );


    function pad(n : number)
    {
        return n.toString().padStart(2, '0');
    }
}
