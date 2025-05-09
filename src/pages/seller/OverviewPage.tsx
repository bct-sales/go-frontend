import Loading from "@/components/Loading";
import SellerSummaryViewer from "@/components/SellerSummaryViewer";
import { getSellerSummary, SellerSummary } from "@/rest/seller-summary";
import { RestStatus } from "@/rest/status";
import { Button, Card, Stack, Stepper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Props
{
    sellerId: number;
}

export default function OverviewPage(props: Props): React.ReactNode
{
    const navigate = useNavigate();
    const [status, setStatus] = useState<RestStatus<SellerSummary>>({ status: 'loading' });

    useEffect(() => {
        void (async () => {
            const response = await getSellerSummary(props.sellerId);

            if (response.success)
            {
                setStatus({ status: 'success', value: response.value });
            }
            else
            {
                setStatus({ status: 'error', tag: response.error.type, details: response.error.details });
            }
        })();
    }, [props.sellerId]);

    switch (status.status)
    {
        case 'success':
            return renderPage(status.value);

        case 'loading':
            return (
                <Loading message="Fetching summary data..." />
            );

        case 'error':
            return <div>Error: {status.details}</div>;
    }

    function renderPage(sellerSummary: SellerSummary): React.ReactNode
    {
        const labelsToBePrinted = sellerSummary.itemCount - sellerSummary.frozenItemCount;
        const activePhase = determineActivePhase(sellerSummary);

        return (
            <Stack align='center' justify='flex-start'>
                <Card withBorder p="lg" radius="md">
                    <Card.Section withBorder pb='sm' pt='xs'>
                        <Text fw='bold'>Overview</Text>
                    </Card.Section>
                    <Card.Section>
                        <SellerSummaryViewer
                            sellerId={props.sellerId}
                            itemCount={sellerSummary.itemCount}
                            frozenItemCount={sellerSummary.frozenItemCount}
                            totalPrice={sellerSummary.totalPrice} />
                    </Card.Section>
                </Card>
                <Stepper active={activePhase} m='xl'>
                    <Stepper.Step label="Step 1" description="Add items">
                        <Card w="50%" m="auto" mt='lg' withBorder radius="md">
                            <Card.Section p='md'>
                                You have not yet added any items to your seller account.
                                Please add items to your seller account before proceeding.
                            </Card.Section>
                            <Card.Section p='md'>
                                <Button variant="outline" color="blue" onClick={() => { navigate('/seller/add-item') }}>
                                    Add Items
                                </Button>
                            </Card.Section>
                        </Card>
                    </Stepper.Step>
                    <Stepper.Step label="Step 2" description="Print labels">
                        <Card w="50%" m="auto" mt='lg' withBorder radius="md">
                            <Card.Section p='md'>
                                {printLabelsMessage()}
                            </Card.Section>
                            <Card.Section p='md'>
                                <Stack>
                                    <Button variant="outline" color="blue" onClick={() => { navigate('/seller/items') }}>
                                        Item Overview
                                    </Button>
                                    <Button variant="outline" color="blue" onClick={() => { navigate('/seller/add-item') }}>
                                        Add More Items
                                    </Button>
                                    <Button variant="outline" color="blue" onClick={() => { navigate('/seller/labels') }}>
                                        Generate Labels
                                    </Button>
                                </Stack>
                            </Card.Section>
                        </Card>
                    </Stepper.Step>
                    <Stepper.Step label="Step 3" description="Bring items to allocator">
                    <Card w="50%" m="auto" mt='lg' withBorder radius="md">
                            <Card.Section p='md'>
                                <Text>
                                    You have added items to your seller account, and generated labels for them.
                                    You can now bring the items to the allocator.
                                    You can of course still add more items if you wish.
                                </Text>
                            </Card.Section>
                            <Card.Section p='md'>
                                <Stack>
                                    <Button variant="outline" color="blue" onClick={() => { navigate('/seller/items') }}>
                                        Item Overview
                                    </Button>
                                    <Button variant="outline" color="blue" onClick={() => { navigate('/seller/add-item') }}>
                                        Add More Items
                                    </Button>
                                    <Button variant="outline" color="blue" onClick={() => { navigate('/seller/labels') }}>
                                        Generate Labels
                                    </Button>
                                </Stack>
                            </Card.Section>
                        </Card>
                    </Stepper.Step>
                </Stepper>
            </Stack>
        );


        function printLabelsMessage(): React.ReactNode
        {
            if ( labelsToBePrinted === 0 )
            {
                return (
                    <Text>
                        You have currently added {sellerSummary.itemCount} items.
                        When you are ready, you can generate labels for the items you have added.
                    </Text>
                );
            }
            else
            {
                return (
                    <Text>
                        You have currently added {sellerSummary.itemCount}.
                        However, for {labelsToBePrinted} of them, you have not yet printed labels.
                        You can add more items, or choose to generate labels.
                    </Text>
                );
            }
        }
    }

    function determineActivePhase(sellerSummary: SellerSummary): number
    {
        if (sellerSummary.itemCount === 0)
        {
            return 0;
        }
        else if (sellerSummary.frozenItemCount !== sellerSummary.itemCount)
        {
            return 1;
        }
        else
        {
            return 2;
        }
    }
}
