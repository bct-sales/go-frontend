import { useSettings } from "@/settings";

interface Props
{
    children: React.ReactElement;
}

export default function AdvancedOnly(props: Props): React.ReactElement
{
    const settings = useSettings();

    if (settings.advancedMode)
    {
        return <>{props.children}</>;
    }
    else
    {
        return <></>;
    }
}
