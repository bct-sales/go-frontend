import { Checkbox, Flex } from "@mantine/core";
import CharityCheckboxIcon from "./CharityCheckboxIcon";
import HelpPopover from "./HelpPopover";


interface Props
{
    charity: boolean;
    setCharity: (charity: boolean) => void;
}

export default function CharityEditor(props: Props): React.ReactNode
{
    return (
        <Flex justify="space-between">
            <Checkbox icon={CharityCheckboxIcon} checked={props.charity} onChange={onChange} label="Charity" size="lg" />
            <HelpPopover>
                If the item gets sold, you will receive the profits.
                If the item does not get sold, it will be donated to a charity.
            </HelpPopover>
        </Flex>
    );


    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        props.setCharity(event.currentTarget.checked);
    }
}
