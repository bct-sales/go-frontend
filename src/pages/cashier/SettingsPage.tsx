import { useSettings } from "@/settings";
import { Stack, Switch } from "@mantine/core";


export default function SettingsPage()
{
    const settings = useSettings();

    return (
        <Stack>
            <Switch label="Play sounds" onChange={onToggleSounds} checked={settings.cashierSounds} />
        </Stack>
    );


    function onToggleSounds(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.currentTarget.checked;
        settings.setCashierSounds(isChecked);
    }
}
