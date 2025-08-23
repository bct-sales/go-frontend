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
            <Checkbox icon={DonationCheckboxIcon} checked={props.donation} onChange={onChange} label="Donate proceeds" size="lg" />
            <HelpPopover>
                In case the item gets sold, the profits will be given to the BCT.
            </HelpPopover>
        </Flex>
    );


    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        props.setDonation(event.currentTarget.checked);
    }
}
