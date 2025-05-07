import SellerSummaryViewer from "@/components/SellerSummaryViewer";
import { Card, Text } from "@mantine/core";


interface Props
{
    sellerId: number;
}

export default function OverviewSubpage(props: Props): React.ReactNode
{
    return (
        <Card withBorder p="lg" radius="md">
            <Card.Section withBorder pb='sm' pt='xs'>
                <Text fw='bold'>Overview</Text>
            </Card.Section>
            <Card.Section>
                <SellerSummaryViewer sellerId={props.sellerId} />
            </Card.Section>
        </Card>
    );
}
