import Echo from 'laravel-echo';

declare global {
    interface Window {
        Pusher: any
    }
}

import Pusher from 'pusher-js';
window.Pusher = Pusher;

const Websocket = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsPort: import.meta.env.VITE_PUSHER_PORT,
    wssPort: import.meta.env.VITE_PUSHER_PORT,
    forceTLS: import.meta.env.VITE_PUSHER_PORT === '443',
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

interface ListenerCallback {
    [index: string]: () => []
}

interface ChannelCallbacks {
    [index: string]: ListenerCallback
}


export default Websocket;

