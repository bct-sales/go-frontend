import LabelLayoutViewer from "@/components/LabelLayoutViewer";
import { LabelLayoutData } from "@/label-layout";
import { NumberInput, Stack } from "@mantine/core";

interface Props
{
    sellerId: number;
}

export default function GenerateLabelsSubpage(props: Props): React.ReactNode
{
    const labelLayout: LabelLayoutData = {
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

    return (
        <Stack justify="flex-start" align="stretch">
            <LabelLayoutViewer width={500} labelLayout={labelLayout} />
            <NumberInput label="Paper Width" min={0} step={1} />
            <NumberInput label="Paper Height" min={0} step={1} />
            <NumberInput label="Top Margin" min={0} step={1} />
            <NumberInput label="Bottom Margin" min={0} step={1} />
            <NumberInput label="Left Margin" min={0} step={1} />
            <NumberInput label="Right Margin" min={0} step={1} />
            <NumberInput label="Column Count" min={0} step={1} />
            <NumberInput label="Row Count" min={0} step={1} />
            <NumberInput label="Label Margin" min={0} step={1} />
            <NumberInput label="Label Padding" min={0} step={1} />
            <NumberInput label="Font Size" min={0} step={1} />
        </Stack>
    );
}