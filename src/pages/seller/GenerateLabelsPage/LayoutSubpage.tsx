import InsetsEditor from "@/components/InsetsEditor";
import LabelLayoutViewer from "@/components/LabelLayoutViewer";
import NumberInput from "@/components/NumberInput";
import { LabelLayoutData } from "@/label-layout";
import { Button, Center, Flex, Group, Stack, Tabs, Text } from "@mantine/core";


interface Props
{
    layout: LabelLayoutData;
    setLayout: (layout: LabelLayoutData) => void;
    goToNextStep?: () => void;
}

export default function ItemSelectionSubpage(props: Props): React.ReactNode
{
    const { layout, setLayout } = props;

    return (
        <Stack>
            <Group justify="center" align="flex-start">
                <LabelLayoutViewer width='400' layout={layout} />
                <Stack align="stretch">
                    <Tabs defaultValue="label-counts">
                        <Tabs.List>
                            <Tabs.Tab value="label-counts">Label Counts</Tabs.Tab>
                            <Tabs.Tab value="paper-margins">Sheet Margins</Tabs.Tab>
                            <Tabs.Tab value="label-margins">Label Margins</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="label-counts">
                            <Stack mt='md'>
                                <Flex justify='stretch'>
                                    <Text>
                                        Here you can set the number of labels per row and column.
                                    </Text>
                                </Flex>
                                <NumberInput label="Columns" min={1} step={1} value={layout.columns} onChange={onChange('columns')} />
                                <NumberInput label="Rows" min={1} step={1} value={layout.rows} onChange={onChange('rows')} />
                            </Stack>
                        </Tabs.Panel>
                        <Tabs.Panel value="paper-margins">
                            <Stack mt='md'>
                                <Flex justify='stretch'>
                                    <Text w='400px'>
                                        Here you can set the size of the margins of the paper.
                                    </Text>
                                </Flex>
                                <Center>
                                    <InsetsEditor insets={layout.paperMargins} onChange={onChange('paperMargins')} />
                                </Center>
                            </Stack>
                        </Tabs.Panel>
                        <Tabs.Panel value="label-margins">
                            <Stack mt='md'>
                                <Flex justify='stretch'>
                                    <Text w='400px'>
                                        Here you can set the size of the paper. The default is A4 (210mm x 297mm).
                                        Note that the preview might react unintuitively to the changes:
                                        it accurately reflects the proportions of the paper, but not the actual size.
                                    </Text>
                                </Flex>
                                <Center>
                                    <InsetsEditor insets={layout.labelMargins} onChange={onChange('labelMargins')} />
                                </Center>
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Stack>
            </Group>
            <Center>
                <Button w='50%' onClick={props.goToNextStep}>Next step</Button>
            </Center>
        </Stack>
    );

    function onChange<K extends keyof LabelLayoutData>(key: K): (value: LabelLayoutData[K]) => void
    {
        return (value: LabelLayoutData[K]) =>
        {
            setLayout({ ...layout, [key]: value });
        };
    }
}