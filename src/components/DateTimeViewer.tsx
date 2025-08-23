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

    const date = new Date(props.dateTime.timestamp * 1000);


    return (
        <span>
            {date.toLocaleString('en-UK')}
        </span>
    );
}
