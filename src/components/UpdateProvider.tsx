import { UpdateNotificationContext, UpdateNotifier, useWebsocket } from "@/websocket";
import React from "react";


interface Props
{
    children: React.ReactNode;
}

export default function UpdateProvider(props: Props)
{
    const websocket = useWebsocket();
    const updateNotifier: UpdateNotifier = {
        register: registerUpdateObserver,
    };

    return (
        <UpdateNotificationContext.Provider value={updateNotifier}>
            {props.children}
        </UpdateNotificationContext.Provider>
    );


    function registerUpdateObserver(callback: () => void): () => void
    {
        return websocket.register(callback);
    }
}
