import React from "react";


export type SettingsData = { advancedMode: boolean };

export interface Settings extends SettingsData
{
    toggleAdvancedMode: () => void;
}

export const defaultSettings: SettingsData = { advancedMode: false };

export function createSettings(settings: SettingsData, setSettings: (data: SettingsData) => void): Settings
{
    return { ...settings, toggleAdvancedMode };


    function toggleAdvancedMode()
    {
        console.log("Toggling advanced mode", settings.advancedMode);
        setSettings({...settings, advancedMode: !settings.advancedMode });
    }
}

export const SettingsContext = React.createContext<Settings>(createSettings(defaultSettings, () => {}));

export function useSettings(): Settings
{
    return React.useContext(SettingsContext);
}
