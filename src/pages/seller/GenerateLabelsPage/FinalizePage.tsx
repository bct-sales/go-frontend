import { Button, Card, Center, Stack, Text } from "@mantine/core";


interface Props
{
    onFinalize: () => void;
    disabled: boolean;
}

export default function FinalizePage(props: Props): React.ReactNode
{
    return (
        <Stack>
            <Card shadow="sm" padding="lg" w='50%' m='auto'>
                <Text>
                    Pressing this button will lead a PDF file to be generated containing all the labels you specified in the previous steps.
                    Note that all items for which you generate labels will be frozen and will not be able to be modified anymore.
                </Text>
            </Card>
            <Center>
                <Button onClick={props.onFinalize} disabled={props.disabled} w='20%'>
                    Generate
                </Button>
            </Center>
        </Stack>
    )
}