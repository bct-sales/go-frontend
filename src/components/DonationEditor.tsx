import { Checkbox, Flex } from "@mantine/core";
import DonationCheckboxIcon from "./DonationCheckboxIcon";
import HelpPopover from "./HelpPopover";


interface Props
{
    donation: boolean;
    setDonation: (donation: boolean) => void;
}

export default function DonationEditor(props: Props): React.ReactNode
{
    return (
        <Flex justify="space-between">
            <Checkbox icon={DonationCheckboxIcon} checked={props.donation} onChange={onChange} label="Donate &euro; to BCT" size="lg" />
            <HelpPopover>
                In case the item gets sold, the proceeds will be donated to the BCT.
                If the item does not get sold, the item returns back to you.
            </HelpPopover>
        </Flex>
    );


    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        props.setDonation(event.currentTarget.checked);
    }
}
