import { Checkbox } from "@mantine/core";
import CharityCheckboxIcon from "./CharityCheckboxIcon";


interface Props
{
    charity: boolean;
    setCharity: (charity: boolean) => void;
}

export default function CharityEditor(props: Props): React.ReactNode
{
    return (
        <Checkbox icon={CharityCheckboxIcon} checked={props.charity} onChange={onChange} label="Charity" />
    );


    function onChange(event: React.ChangeEvent<HTMLInputElement>): void
    {
        props.setCharity(event.currentTarget.checked);
    }
}
