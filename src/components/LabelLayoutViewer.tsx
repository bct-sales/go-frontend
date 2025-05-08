import { Label, LabelLayoutData, LayoutHelper } from "@/label-layout";
import React from "react";

interface Props
{
    width: string | number;
    labelLayout: LabelLayoutData
}

export default function LabelLayoutViewer(props: Props): React.ReactNode
{
    const { labelLayout } = props;
    const layoutHelper = new LayoutHelper(labelLayout);

    return (
        <div style={{padding: '10px', background: '#AAA'}}>
            <svg width={props.width} viewBox={`0 0 ${labelLayout.paperWidth} ${labelLayout.paperHeight}`}>
                <rect x={0} y={0} width={labelLayout.paperWidth} height={labelLayout.paperHeight} fill="white" stroke="black" strokeWidth={1} />
                {renderLabels()}
            </svg>
        </div>
    );


    function renderLabels(): React.ReactNode
    {
        const rectangles = layoutHelper.labels;

        return (
            <>
                {rectangles.map((label, index) => (
                    <React.Fragment key={index}>
                        {renderLabel(label)}
                    </React.Fragment>
                ))}
            </>
        );
    }

    function renderLabel(label: Label): React.ReactNode
    {
        return (
            <>
                <rect x={label.border.x} y={label.border.y} width={label.border.width} height={label.border.height} fill="white" stroke="black" strokeWidth={2} />
                <rect x={label.usableSpace.x} y={label.usableSpace.y} width={label.usableSpace.width} height={label.usableSpace.height} fill="white" stroke="#AAA" strokeWidth={0.5} />
            </>
        );
    }
}