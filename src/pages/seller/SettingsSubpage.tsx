import { useSettings } from "@/settings";
import { Stack, Switch } from "@mantine/core";


export default function SettingsSubpage()
{
    const settings = useSettings();

    return (
        <Stack>
            <Switch label="Advanced mode" onChange={onToggleAdvancedMode} checked={settings.advancedMode} />
        </Stack>
    );


    function onToggleAdvancedMode(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.currentTarget.checked;
        settings.setAdvancedMode(isChecked);
    }
}
