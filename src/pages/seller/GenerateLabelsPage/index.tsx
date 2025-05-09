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
import LayoutSubpage from "./LayoutSubpage";


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
                    <LayoutSubpage layout={labelLayout} setLayout={setLabelLayout} />
                </Stepper.Step>
                <Stepper.Step label="Generate PDF" allowStepSelect={true}>
                    <Button onClick={onGenerateLabels} disabled={items.length === 0}>Generate</Button>
                </Stepper.Step>
            </Stepper>
        );


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