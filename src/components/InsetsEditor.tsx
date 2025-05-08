import { Spacing } from "@/label-layout";
import { Grid, NumberInput } from "@mantine/core";


interface Props
{
    insets: Spacing;
}

export default function InsetsEditor(props: Props): React.ReactNode
{
    return (
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto', gap: '0.5em' }}>
            <div />
            <NumberInput min={0} step={1} value={props.insets.top} suffix='mm' w='5em'  />
            <div />

            <NumberInput min={0} step={1} value={props.insets.left} suffix='mm' w='5em' />
            <div />
            <NumberInput min={0} step={1} value={props.insets.right} suffix='mm' w='5em' />

            <div />
            <NumberInput min={0} step={1} value={props.insets.bottom} suffix='mm' w='5em' />
            <div />
        </div>
    );
}
