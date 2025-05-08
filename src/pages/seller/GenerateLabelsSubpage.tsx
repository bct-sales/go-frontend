import CaptionedBox from "@/components/CaptionedBox";
import InsetsEditor from "@/components/InsetsEditor";
import LabelLayoutViewer from "@/components/LabelLayoutViewer";
import NumberInput from "@/components/NumberInput";
import { LabelLayoutData } from "@/label-layout";
import { Box, Flex, Grid, Group, Stack, Table } from "@mantine/core";
import { useState } from "react";


interface Props
{
    sellerId: number;
}

export default function GenerateLabelsSubpage(props: Props): React.ReactNode
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

    const [labelLayout, setLabelLayout] = useState<LabelLayoutData>(defaultLabelLayout);

    return (
        <Stack align="center">
            <LabelLayoutViewer width='400' labelLayout={labelLayout} />
            <Stack align="stretch" w='300px'>
                <CaptionedBox caption="Label Counts">
                    <Stack>
                        <NumberInput label="Columns" min={1} step={1} value={labelLayout.columns} onChange={onChange('columns')} />
                        <NumberInput label="Rows" min={1} step={1} value={labelLayout.rows} onChange={onChange('rows')} />
                    </Stack>
                </CaptionedBox>
                <CaptionedBox caption="Paper Size">
                    <Stack>
                        <NumberInput label="Width" min={0} step={1} value={labelLayout.paperWidth} suffix='mm' onChange={onChange('paperWidth')} />
                        <NumberInput label="Height" min={0} step={1} value={labelLayout.paperHeight} suffix='mm' onChange={onChange('paperHeight')} />
                    </Stack>
                </CaptionedBox>
                <CaptionedBox caption="Paper Margins">
                    <InsetsEditor insets={labelLayout.paperMargins} onChange={onChange('paperMargins')} />
                </CaptionedBox>
                <CaptionedBox caption="Label Margins">
                    <InsetsEditor insets={labelLayout.labelMargins} onChange={onChange('labelMargins')} />
                </CaptionedBox>
                <CaptionedBox caption="Label Padding">
                    <InsetsEditor insets={labelLayout.labelPadding} onChange={onChange('labelPadding')} />
                </CaptionedBox>
            </Stack>
        </Stack>
    );


    function onChange<K extends keyof LabelLayoutData>(key: K): (value: LabelLayoutData[K]) => void
    {
        return (value: LabelLayoutData[K]) =>
        {
            setLabelLayout((prev) => ({ ...prev, [key]: value }));
        };
    }
}