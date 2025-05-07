import React from "react";


export type SettingsData = { advancedMode: boolean };

export interface Settings extends SettingsData
{
    setAdvancedMode: (value: boolean) => void;
    toggleAdvancedMode: () => void;
}

export const defaultSettings: SettingsData = { advancedMode: false };

export function createSettings(settings: SettingsData, setSettings: (data: SettingsData) => void): Settings
{
    return { ...settings, setAdvancedMode, toggleAdvancedMode };


    function setAdvancedMode(value: boolean): void
    {
        setSettings({ ...settings, advancedMode: value });
    }

    function toggleAdvancedMode(): void
    {
        setAdvancedMode(!settings.advancedMode);
    }
}

export const SettingsContext = React.createContext<Settings>(createSettings(defaultSettings, () => {}));

export function useSettings(): Settings
{
    return React.useContext(SettingsContext);
}
