import { useSettings } from "@/settings";

interface Props
{
    children: React.ReactNode;
}

export default function AdvancedOnly(props: Props): React.ReactNode
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
