import { Text, Button, Flex, Group, NumberInput, Stack } from "@mantine/core";
import { NumberFormatValues } from "react-number-format";
import HelpPopover from "./HelpPopover";


interface Props
{
    priceInCents: number;
    setPriceInCents: (priceInCents: number) => void;
    quickButtons?: number[];
}

export default function ItemPriceEditor(props: Props): React.ReactNode
{
    const { priceInCents, setPriceInCents } = props;

    return (
        <Stack gap='xs'>
            <Group justify="space-between" align="center">
                <Text>Price</Text>
                <HelpPopover>
                    <Text size="sm">
                        Must be a multiple of &euro;0.50 and at least &euro;0.50.
                    </Text>
                </HelpPopover>
            </Group>
            <NumberInput
                value={priceInCents / 100}
                step={0.50}
                min={0.50}
                prefix='€'
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                isAllowed={isAllowed}
                onChange={onChange} />
            {renderQuickButtons()}
        </Stack>
    );


    function renderQuickButtons(): React.ReactNode
    {
        if ( props.quickButtons && props.quickButtons.length > 0 )
        {
            return (
                <Flex direction="row" justify="flex-end" align="center" gap="md">
                    {props.quickButtons.map(value => renderQuickButton(value))}
                </Flex>
            );
        }
        else
        {
            return <></>;
        }
    }

    function renderQuickButton(priceInCents: number): React.ReactNode
    {
        const euros = Math.floor(priceInCents / 100);
        const cents = priceInCents % 100;

        return (
            <Button onClick={() => setPriceInCents(priceInCents)} tabIndex={-1}>
                {`€${euros}.${cents.toString().padStart(2, '0')}`}
            </Button>
        );
    }

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