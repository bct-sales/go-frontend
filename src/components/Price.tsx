interface Props
{
    priceInCents: number;
}


export default function Price(props: Props): React.ReactNode
{
    const { priceInCents } = props;

    const euros = Math.floor(priceInCents / 100);
    const cents = priceInCents % 100;

    return (
        <span>
            &euro;{euros}.{cents.toString().padStart(2, '0')}
        </span>
    );
}
