import { useSettings } from "@/settings";
import { Stack, Switch } from "@mantine/core";


export default function SettingsPage()
{
    const settings = useSettings();

    return (
        <Stack>
            <Switch label="Play Sounds" onChange={onToggleSounds} checked={settings.cashierSounds} />
            <Switch label="Show Consumables" onChange={onToggleShowConsumables} checked={settings.showConsumables} />
        </Stack>
    );


    function onToggleSounds(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.currentTarget.checked;
        settings.setCashierSounds(isChecked);
    }

    function onToggleShowConsumables(event: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = event.currentTarget.checked;
        settings.setShowConsumables(isChecked);
    }
}
