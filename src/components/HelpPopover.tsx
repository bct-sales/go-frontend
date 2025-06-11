import { Button, Popover } from "@mantine/core";
import { IconHelpCircle } from "@tabler/icons-react";

interface Props
{
    children: React.ReactNode;
}

export default function HelpPopover(props: Props): React.ReactNode
{
    return (
        <Popover position="bottom" shadow="md" width={250}>
            <Popover.Target>
                <Button variant="subtle" size="xs" p={0} tabIndex={-1}>
                    <IconHelpCircle />
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                {props.children}
            </Popover.Dropdown>
        </Popover>
    );
}
