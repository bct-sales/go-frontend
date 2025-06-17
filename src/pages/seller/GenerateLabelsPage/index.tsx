import Loading from "@/components/Loading";
import { LabelLayoutData } from "@/label-layout";
import { generateLabels } from "@/rest/generate-labels";
import { listSellerItems } from "@/rest/list-seller-items";
import { RestStatus } from "@/rest/status";
import { Button, Stack, Stepper } from "@mantine/core";
import { useEffect, useState } from "react";
import ItemSelectionSubpage from "./ItemSelectionSubpage";
import LayoutSubpage from "./LayoutSubpage";
import { notifications } from "@mantine/notifications";
import { Item } from "@/components/ItemsTable/ItemsTable";


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
    const [itemCountTable, setItemCountTable] = useState<{ [id: string]: number }>({});

    useEffect(() => {
            void (async () => {
                const response = await listSellerItems(props.sellerId);

                if (response.success)
                {
                    setItemsStatus({ status: 'success', value: response.value.items });

                    const table: { [id: string]: number } = {};
                    for (const item of response.value.items)
                    {
                        table[item.itemId] = 2;
                    }
                    setItemCountTable(table);
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
            <Stack align="center" justify="flex-start" gap="lg">
                <Stepper active={activeStep} onStepClick={setActiveStep} color="teal" size="sm" iconPosition="left">
                    <Stepper.Step label="Select Items" allowStepSelect={true} />
                    <Stepper.Step label="Label Layout" allowStepSelect={true} />
                    <Stepper.Step label="Generate PDF" allowStepSelect={true} />
                </Stepper>
                {renderActiveStep()}
            </Stack>
        );


        function renderActiveStep(): React.ReactNode
        {
            switch ( activeStep )
            {
                case 0:
                    return (
                        <ItemSelectionSubpage items={items} count={count} setCount={setCount} />
                    );

                case 1:
                    return (
                        <LayoutSubpage layout={labelLayout} setLayout={setLabelLayout} />
                    );

                case 2:
                    return (
                        <Button onClick={onGenerateLabels} disabled={items.length === 0}>Generate</Button>
                    );

                default:
                    return <div>Bug: unknown step</div>;
            }
        }

        function onGenerateLabels(): void
        {
            void (async () => {
                const selectedItemIds: number[] = [];

                for ( const item of items )
                {
                    const n = count(item);
                    for ( let i = 0; i < n; i++ )
                    {
                        selectedItemIds.push(item.itemId);
                    }
                }

                const payload = { layout: labelLayout, itemIds: selectedItemIds };
                const blob = await generateLabels(payload);

                if ( !blob.success )
                {
                    notifications.show({
                        title: "Error",
                        message: `Failed to generate labels: ${blob.error.details} (${blob.error.type})`,
                        color: "red",
                    });
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

    function count(item: Item): number
    {
        return itemCountTable[item.itemId] || 0;
    }

    function setCount(item: Item, n: number): void
    {
        setItemCountTable(old => ({ ...old, [item.itemId]: n }));
    }
}