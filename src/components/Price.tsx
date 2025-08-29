interface Props
{
    priceInCents: number;
    className?: string;
}


export default function Price(props: Props): React.ReactNode
{
    const { priceInCents } = props;

    const euros = Math.floor(priceInCents / 100);
    const cents = priceInCents % 100;

    return (
        <span className={props.className}>
            &euro;{euros.toLocaleString()}
            .
            {cents.toString().padStart(2, '0')}
        </span>
    );
}
