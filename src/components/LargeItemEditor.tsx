import { Checkbox, Flex } from "@mantine/core";
import HelpPopover from "./HelpPopover";
import LargeItemCheckboxIcon from "./LargeItemCheckboxIcon";


interface Props
{
    isLarge: boolean;
    setIsLarge: (isLarge: boolean) => void;
}

export default function DonationEditor(props: Props): React.ReactNode
{
    return (
        <Flex justify="space-between">
            <Checkbox icon={LargeItemCheckboxIcon} checked={props.isLarge} onChange={onChange} label="Large Item" size="lg" />
            <HelpPopover>
                Indicates this is a large item.
            </HelpPopover>
        </Flex>
    );


    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        props.setIsLarge(event.currentTarget.checked);
    }
}
