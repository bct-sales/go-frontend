import { WebsocketContext } from "@/websocket";
import { ReactNode, useRef } from "react";

interface Props
{
    url: string;
    timeout?: number;
    children?: ReactNode;
}

interface WebsocketObserver
{
    active: boolean;
    callback: (msg: string) => void;
}

export default function WebsocketProvider(props: Props): ReactNode
{
    const { url } = props;
    const websocketReference = useRef<WebSocket | null>(null);
    const observers = useRef<WebsocketObserver[]>([]);
    const websocketFacade = {
        register: registerWebsocketObserver,
    };

    return (
        <WebsocketContext.Provider value={websocketFacade}>
            {props.children}
        </WebsocketContext.Provider>
    );


    function registerWebsocketObserver(callback: (msg: string) => void): () => void
    {
        const observer: WebsocketObserver = { active: true, callback };
        observers.current = [...observers.current, observer];

        console.debug(`Registered a websocket observer; current count: ${observers.current.length}`);

        if (websocketReference.current === null) {
            openWebsocket();
        }

        return () => {
            observer.active = false;
            observers.current = observers.current.filter(o => o.active);

            console.debug(`Unregistering websocket observer; current count: ${observers.current.length}. This value should be zero.`);

            if (observers.current.length === 0) {
                delayedCloseWebsocket();
            }
        };
    }

    function openWebsocket()
    {
        console.debug(`Creating websocket to ${url}`);
        const websocket = new WebSocket(url);
        websocketReference.current = websocket;

        websocket.onmessage = (event) => broadcastMessage(event.data);
    }

    function delayedCloseWebsocket()
    {
        const delay = props.timeout || 5000;
        console.debug(`No observers left; scheduling websocket close in ${delay}ms`);

        setTimeout(() => {
            console.debug("Delay passed; if there still no observers, I will close the websocket");
            if (websocketReference.current !== null && observers.current.length === 0) {
                closeWebsocket();
                websocketReference.current = null;
            }
        }, delay);
    }

    function closeWebsocket()
    {
        const websocket = websocketReference.current;

        if ( websocket !== null )
        {
            console.debug("Closing websocket");
            websocket.send("bye");
            websocket.close();
            websocketReference.current = null;
        }
    }

    function broadcastMessage(msg: string)
    {
        observers.current.forEach(observer => {
            observer.callback(msg);
        });
    }
}