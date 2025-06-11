import { Text } from "@mantine/core";


interface Props
{
    cashierId: number;
}

export default function OverviewPage(props: Props): React.ReactNode
{
    return (
        <Text size="xl"style={{ padding: '1rem' }}>
            Cashier!
        </Text>
    );
}
