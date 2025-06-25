import { UpdateNotificationContext, UpdateNotifier, useWebSocket } from "@/websocket";
import React, { useRef } from "react";


interface Props
{
    children: React.ReactNode;
}

interface Observer
{
    active: boolean;
    callback: () => void;
}

export default function UpdateProvider(props: Props)
{
    const observers = useRef<Observer[]>([]);
    useWebSocket("ws://localhost:8000/api/v1/websocket", () => {
        observers.current.forEach(observer => {
            observer.callback();
        });
    });
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
        const observer: Observer = { active: true, callback };
        observers.current = [...observers.current, observer];

        console.log("Registered observer count: ", observers.current.length);

        return () => {
            observer.active = false;
            observers.current = observers.current.filter(o => o.active);
        };
    }
}