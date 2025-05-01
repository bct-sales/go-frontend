import { Group, Stack, TextInput, Text, Popover, Button } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

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
                <Popover position="bottom" shadow="md" width={250}>
                    <Popover.Target>
                        <Button variant="subtle" size="xs" p={0}>
                            <IconQuestionMark />
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Text size="sm">
                            Keep it short but descriptive.
                            Keep in mind it needs to fit on the label.
                        </Text>
                    </Popover.Dropdown>
                </Popover>
            </Group>
            <TextInput
                placeholder="description"
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