import { Spacing } from "@/label-layout";
import { NumberInput } from "@mantine/core";


interface Props
{
    insets: Spacing;
    onChange?: (insets: Spacing) => void;
}

export default function InsetsEditor(props: Props): React.ReactNode
{
    return (
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'auto auto auto', gap: '0.5em' }}>
            <div />
            <NumberInput min={0} step={1} value={props.insets.top} suffix='mm' w='5em' onChange={onChange('top')} />
            <div />

            <NumberInput min={0} step={1} value={props.insets.left} suffix='mm' w='5em' onChange={onChange('left')} />
            <div />
            <NumberInput min={0} step={1} value={props.insets.right} suffix='mm' w='5em' onChange={onChange('right')} />

            <div />
            <NumberInput min={0} step={1} value={props.insets.bottom} suffix='mm' w='5em' onChange={onChange('bottom')} />
            <div />
        </div>
    );


    function onChange(name: keyof Spacing): (value: number | string) => void
    {
        return (value: number | string) =>
        {
            if (typeof value === 'string')
            {
                console.error(`Unexpected string value: ${value}`);
                return;
            }

            props.onChange?.({
                ...props.insets,
                [name]: value
            });
        };
    }
}
