import { NumberInputProps, NumberInput as OriginalNumberInput } from "@mantine/core";


interface Props extends Omit<NumberInputProps, 'onChange'>
{
    onChange: (value: number) => void;
}

export default function NumberInput(props: Props): React.ReactNode
{
    const updatedProps = {
        ...props,
        onChange: (value: number | string) =>
        {
            if (typeof value === 'string')
            {
                console.error(`Unexpected string value: ${value}`);
                return;
            }

            props.onChange(value);
        }
    }

    return (
        <OriginalNumberInput {...updatedProps} />
    );
}
