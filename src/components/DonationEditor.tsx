import { Checkbox } from "@mantine/core";
import DonationCheckboxIcon from "./DonationCheckboxIcon";


interface Props
{
    donation: boolean;
    setDonation: (donation: boolean) => void;
}

export default function DonationEditor(props: Props): React.ReactNode
{
    return (
        <Checkbox icon={DonationCheckboxIcon} checked={props.donation} onChange={onChange} label="Donation" size="lg" />
    );


    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        props.setDonation(event.currentTarget.checked);
    }
}
