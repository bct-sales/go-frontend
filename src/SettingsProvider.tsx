import React from "react";
import { createSettings, defaultSettings as defaultSettingsData, SettingsContext, SettingsData } from "./settings";
import { useHotkeys } from "@mantine/hooks";


export function SettingsProvider({ children }: { children: React.ReactNode }): React.ReactElement
{
    const [settingsData, setSettingsData] = React.useState<SettingsData>(defaultSettingsData);
    const settings = createSettings(settingsData, setSettingsData);

    useHotkeys([
        ["ctrl+alt+a", settings.toggleAdvancedMode],
    ]);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}
