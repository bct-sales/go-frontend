import { TextInput } from "@mantine/core";

interface Props
{
    description: string;
    setDescription: (description: string) => void;
}


export default function ItemDescriptionEditor(props: Props): React.ReactNode
{
    const { description, setDescription } = props;

    return (
        <TextInput
            label="Description"
            placeholder="description"
            error={error()}
            value={description}
            onChange={onChange} />
    );


    function error(): string | undefined
    {
        if (description.length === 0)
        {
            return 'Cannot be empty';
        }

        return undefined;
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        setDescription(event.currentTarget.value);
    }
}