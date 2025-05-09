import InsetsEditor from "@/components/InsetsEditor";
import ItemsTable from "@/components/ItemsTable";
import { categoryColumn, descriptionColumn, itemIdColumn, selectionColumn } from "@/components/ItemsTable/columns";
import LabelLayoutViewer from "@/components/LabelLayoutViewer";
import Loading from "@/components/Loading";
import NumberInput from "@/components/NumberInput";
import { LabelLayoutData } from "@/label-layout";
import { generateLabels } from "@/rest/generate-labels";
import { Item } from "@/rest/item-data";
import { listSellerItems } from "@/rest/list-seller-items";
import { RestStatus } from "@/rest/status";
import { Button, Center, Flex, Group, Stack, Stepper, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import ItemSelectionSubpage from "./ItemSelectionSubpage";


interface Props
{
    sellerId: number;
}

export default function GenerateLabelsPage(props: Props): React.ReactNode
{
    const defaultLabelLayout: LabelLayoutData = {
        paperWidth: 210,
        paperHeight: 297,
        paperMargins: {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
        },
        columns: 2,
        rows: 8,
        labelMargins: {
            top: 2,
            bottom: 2,
            left: 2,
            right: 2
        },
        labelPadding: {
            top: 2,
            bottom: 2,
            left: 2,
            right: 2
        },
        fontSize: 12
    };

    const [itemsStatus, setItemsStatus] = useState<RestStatus<Item[]>>({ status: 'loading' });
    const [labelLayout, setLabelLayout] = useState<LabelLayoutData>(defaultLabelLayout);
    const [activeStep, setActiveStep] = useState<number>(0);
    const [selectedItems, setSelectedItems] = useState<{ [id: string]: boolean }>({});
    useEffect(() => {
            void (async () => {
                const response = await listSellerItems(props.sellerId);

                if (response.success)
                {
                    setItemsStatus({ status: 'success', value: response.value.items });

                    const mapping: { [id: string]: boolean } = {};
                    for (const item of response.value.items)
                    {
                        mapping[item.itemId] = true;
                    }
                    setSelectedItems(mapping);
                }
                else
                {
                    setItemsStatus({ status: 'error', tag: response.error.type, details: response.error.details });
                }
            })();
        }, [props.sellerId]);

    switch (itemsStatus.status)
    {
        case 'success':
            return renderPage(itemsStatus.value);

        case 'loading':
            return (
                <Loading message="Loading items..." />
            );

        case 'error':
            return <div>Error: {itemsStatus.details}</div>;
    }


    function renderPage(items: Item[]): React.ReactNode
    {
        return (
            <Stepper active={activeStep} onStepClick={setActiveStep} color="teal" size="sm" iconPosition="left" style={{ width: '100%' }}>
                <Stepper.Step label="Select Items" allowStepSelect={true}>
                    <ItemSelectionSubpage items={items} isItemSelected={(item) => selectedItems[item.itemId] === true} setItemSelection={(item, selected) => { setSelectedItems({ ...selectedItems, [item.itemId]: selected }) }} />
                </Stepper.Step>
                <Stepper.Step label="Label Layout" allowStepSelect={true}>
                    <Group justify="center" align="flex-start">
                        <LabelLayoutViewer width='400' labelLayout={labelLayout} />
                        <Stack align="stretch">
                            <Tabs defaultValue="label-counts">
                                <Tabs.List>
                                    <Tabs.Tab value="label-counts">Label Counts</Tabs.Tab>
                                    <Tabs.Tab value="paper-size">Sheet Size</Tabs.Tab>
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
                                        <NumberInput label="Columns" min={1} step={1} value={labelLayout.columns} onChange={onChange('columns')} />
                                        <NumberInput label="Rows" min={1} step={1} value={labelLayout.rows} onChange={onChange('rows')} />
                                    </Stack>
                                </Tabs.Panel>
                                <Tabs.Panel value="paper-size">
                                    <Stack mt='md'>
                                        <Flex justify='stretch'>
                                            <Text w='400px'>
                                                Here you can set the size of the paper. The default is A4 (210mm x 297mm).
                                                Note that the preview might react unintuitively to the changes:
                                                it accurately reflects the proportions of the paper, but not the actual size.
                                            </Text>
                                        </Flex>
                                        <NumberInput label="Width" min={0} step={1} value={labelLayout.paperWidth} suffix='mm' onChange={onChange('paperWidth')} />
                                        <NumberInput label="Height" min={0} step={1} value={labelLayout.paperHeight} suffix='mm' onChange={onChange('paperHeight')} />
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
                                            <InsetsEditor insets={labelLayout.paperMargins} onChange={onChange('paperMargins')} />
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
                                            <InsetsEditor insets={labelLayout.labelMargins} onChange={onChange('labelMargins')} />
                                        </Center>
                                    </Stack>
                                </Tabs.Panel>
                            </Tabs>
                        </Stack>
                    </Group>
                </Stepper.Step>
                <Stepper.Step label="Generate PDF" allowStepSelect={true}>
                    <Button onClick={onGenerateLabels} disabled={items.length === 0}>Generate</Button>
                </Stepper.Step>
            </Stepper>
        );


        function onChange<K extends keyof LabelLayoutData>(key: K): (value: LabelLayoutData[K]) => void
        {
            return (value: LabelLayoutData[K]) =>
            {
                setLabelLayout((prev) => ({ ...prev, [key]: value }));
            };
        }

        function onGenerateLabels(): void
        {
            void (async () => {
                const payload = { layout: labelLayout, itemIds: items.map(item => item.itemId) };
                const blob = await generateLabels(payload);

                if ( !blob.success )
                {
                    console.error("Failed to generate labels", blob.error);
                    return;
                }

                const url = window.URL.createObjectURL(blob.value);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'labels.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })();
        }
    }
}