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
        <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5em' }}>
            <NumberInput min={0} step={1} value={props.insets.top} suffix='mm' w='5em' onChange={onChange('top')} style={{gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 1, gridRowEnd: 1}} />
            <NumberInput min={0} step={1} value={props.insets.left} suffix='mm' w='5em' onChange={onChange('left')} style={{gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 2, gridRowEnd: 2}} />
            <NumberInput min={0} step={1} value={props.insets.right} suffix='mm' w='5em' onChange={onChange('right')} style={{gridColumnStart: 3, gridColumnEnd: 5, gridRowStart: 2, gridRowEnd: 2}} />
            <NumberInput min={0} step={1} value={props.insets.bottom} suffix='mm' w='5em' onChange={onChange('bottom')} style={{gridColumnStart: 2, gridColumnEnd: 4, gridRowStart: 3, gridRowEnd: 3}} />
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
