import React from 'react';


interface WebsocketFacade
{
    register: (callback: (msg: string) => void) => () => void;
}

const dummyWebsocketFacade: WebsocketFacade = {
    register: () => {
        throw new Error("WebsocketFacade not initialized");
    }
};

export const WebsocketContext = React.createContext<WebsocketFacade>(dummyWebsocketFacade);

export function useWebsocket(): WebsocketFacade
{
    return React.useContext(WebsocketContext);
}

export interface UpdateNotifier
{
    register: (callback: () => void) => (() => void);
}

const dummyUpdateNotifier: UpdateNotifier = {
    register: () => {
        throw new Error("UpdateNotifier not initialized");
    }
}

export const UpdateNotificationContext = React.createContext<UpdateNotifier>(dummyUpdateNotifier);

export function useUpdateNotifications(): UpdateNotifier
{
    return React.useContext(UpdateNotificationContext);
}