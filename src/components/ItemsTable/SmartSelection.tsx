import { ActionIcon, Checkbox, Collapse, Group, Stack } from "@mantine/core";
import { IconArrowBarDown, IconArrowBarUp } from "@tabler/icons-react";


interface Props
{
    canSelectUpwards: boolean;
    canSelectDownwards: boolean;
    showRangeSelectors: boolean;
    isSelected: boolean;
    onChangeSelected: (selected: boolean) => void;
    onSelectUpwards?: () => void;
    onSelectDownwards?: () => void;
}

export default function SmartSelection(props: Props): React.ReactNode
{
    return (
        <Stack align="center" gap='0'>
            {renderSelectBefore()}
            <Group>
                <Checkbox checked={props.isSelected} onChange={e => props.onChangeSelected(e.currentTarget.checked)} />
            </Group>
            {renderSelectAfter()}
        </Stack>
    );


    function renderSelectBefore(): React.ReactNode
    {
        return (
            <Collapse in={props.showRangeSelectors}>
                <ActionIcon variant="subtle" disabled={!props.canSelectUpwards} onClick={() => props.onSelectUpwards?.()}>
                    <IconArrowBarUp />
                </ActionIcon>
            </Collapse>
        );
    }


    function renderSelectAfter(): React.ReactNode
    {
        return (
            <Collapse in={props.showRangeSelectors}>
                <ActionIcon variant="subtle" disabled={!props.canSelectDownwards} onClick={() => props.onSelectDownwards?.()}>
                    <IconArrowBarDown />
                </ActionIcon>
            </Collapse>
        );
    }
}