import { ActionIcon, Checkbox, Collapse, Group, Stack, Tooltip } from "@mantine/core";
import { IconArrowBarDown, IconArrowBarUp } from "@tabler/icons-react";


interface Props
{
    canSelectUpwards: boolean;
    canSelectDownwards: boolean;
    showRangeSelectors: boolean;
    isSelected: boolean;
    onClickCheckbox: (selected: boolean) => void;
    onClickUpwards?: (ctrl: boolean) => void;
    onClickDownwards?: (ctrl: boolean) => void;
}

export default function SmartSelection(props: Props): React.ReactNode
{
    return (
        <Stack align="center" gap='0'>
            {renderSelectBefore()}
            <Group>
                <Checkbox checked={props.isSelected} onChange={e => props.onClickCheckbox(e.currentTarget.checked)} />
            </Group>
            {renderSelectAfter()}
        </Stack>
    );


    function renderSelectBefore(): React.ReactNode
    {
        return (
            <Collapse in={props.showRangeSelectors}>
                <Tooltip label="Automates clicks on all items above. Ctrl forces deselect." openDelay={500}>
                    <ActionIcon variant="subtle" disabled={!props.canSelectUpwards} onClick={e => props.onClickUpwards?.(e.ctrlKey)} p={0}>
                        <IconArrowBarUp />
                    </ActionIcon>
                </Tooltip>
            </Collapse>
        );
    }


    function renderSelectAfter(): React.ReactNode
    {
        return (
            <Collapse in={props.showRangeSelectors}>
                <Tooltip label="Automates clicks on all items below. Ctrl forces deselect." openDelay={500}>
                    <ActionIcon variant="subtle" disabled={!props.canSelectDownwards} onClick={e => props.onClickDownwards?.(e.ctrlKey)}>
                        <IconArrowBarDown />
                    </ActionIcon>
                </Tooltip>
            </Collapse>
        );
    }
}