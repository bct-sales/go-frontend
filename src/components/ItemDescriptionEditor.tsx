import { Group, Stack, Text, TextInput } from "@mantine/core";
import HelpPopover from "./HelpPopover";

interface Props
{
    description: string;
    setDescription: (description: string) => void;
}


export default function ItemDescriptionEditor(props: Props): React.ReactNode
{
    const { description, setDescription } = props;

    return (
        <Stack gap='xs'>
            <Group justify="space-between" align="center">
                <Text>Description</Text>
                <HelpPopover>
                    <Text size="sm">
                        Keep the description short but useful.
                        Take into account it needs to fit on the label.
                    </Text>
                </HelpPopover>
            </Group>
            <TextInput
                error={error()}
                value={description}
                onChange={onChange} />
        </Stack>
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