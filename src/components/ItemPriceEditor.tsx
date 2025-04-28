import { NumberInput } from "@mantine/core";
import { NumberFormatValues } from "react-number-format";


interface Props
{
    priceInCents: number;
    setPriceInCents: (priceInCents: number) => void;
}

export default function ItemPriceEditor(props: Props): React.ReactNode
{
    const { priceInCents, setPriceInCents } = props;

    return (
        <NumberInput
            label="Price"
            value={priceInCents / 100}
            step={0.50}
            min={0.50}
            prefix='€'
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator="."
            isAllowed={isAllowed}
            onChange={onChange} />
    );


    function isAllowed(values: NumberFormatValues): boolean
    {
        const value = values.floatValue;

        if ( value === undefined )
        {
            return false;
        }

        return value >= 0.50 && ((value * 2) % 1 === 0);
    }

    function onChange(value: number | string)
    {
        setPriceInCents(Math.round(parseFloat(`${value}`) * 100));
    }
}