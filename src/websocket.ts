import React from 'react';
import { useEffect, useRef } from 'react';


export function useWebSocket(url: string, onMessage: (msg: string) => void) {
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        console.log("opening websocket", url);
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onmessage = (event) => onMessage(event.data);

        return () => { setTimeout( () => { ws.send("bye"); ws.close(); }, 1000 ); }
    }, [url, onMessage]);

    return wsRef;
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
