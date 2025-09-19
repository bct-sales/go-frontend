import React from "react";


export type SettingsData = {
    advancedMode: boolean,
    cashierSounds: boolean,
};

export interface Settings extends SettingsData
{
    setAdvancedMode: (value: boolean) => void;
    toggleAdvancedMode: () => void;
    setCashierSounds: (value: boolean) => void;
}

export const defaultSettings: SettingsData = {
    advancedMode: false,
    cashierSounds: false,
};

export function createSettings(settings: SettingsData, setSettings: (data: SettingsData) => void): Settings
{
    return {
        ...settings,
        setAdvancedMode,
        toggleAdvancedMode,
        setCashierSounds,
    };


    function setAdvancedMode(value: boolean): void
    {
        setSettings({ ...settings, advancedMode: value });
    }

    function toggleAdvancedMode(): void
    {
        setAdvancedMode(!settings.advancedMode);
    }

    function setCashierSounds(value: boolean): void
    {
        setSettings({ ...settings, cashierSounds: value} );
    }
}

export const SettingsContext = React.createContext<Settings>(createSettings(defaultSettings, () => {}));

export function useSettings(): Settings
{
    return React.useContext(SettingsContext);
}
