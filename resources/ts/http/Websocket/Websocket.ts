import Echo from 'laravel-echo';

declare global {
    interface Window {
        Pusher: any
    }
}

window.Pusher = require('pusher-js')


const Websocket = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    wsHost: process.env.MIX_PUSHER_HOST,
    wsPort: process.env.MIX_PUSHER_PORT,
    wssPort: process.env.MIX_PUSHER_PORT,
    forceTLS: process.env.MIX_PUSHER_PORT === '443',
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
});

interface ListenerCallback {
    [index: string]: Function[]
}

interface ChannelCallbacks {
    [index: string]: ListenerCallback
}


export default Websocket;

