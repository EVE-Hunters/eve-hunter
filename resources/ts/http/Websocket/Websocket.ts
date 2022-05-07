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
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: false,
});

interface ListenerCallback {
    [index: string]: Function[]
}

interface ChannelCallbacks {
    [index: string]: ListenerCallback
}


export default Websocket;

