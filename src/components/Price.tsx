import { Flex, Text } from "@mantine/core";

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
        <Flex justify="flex-end" align="center" style={{ width: '100%' }}>
            <Text>
                &euro;{euros}
            </Text>
            <Text>
                .
            </Text>
            <Text w='2rem' style={{ textAlign: 'left' }}>
                {cents.toString().padStart(2, '0')}
            </Text>
        </Flex>
    );
}
