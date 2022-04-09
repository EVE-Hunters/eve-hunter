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
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
});

interface ListenerCallback {
    [index: string]: Function[]
}

interface ChannelCallbacks {
    [index: string]: ListenerCallback
}

class WebsocketClient {
    _socket: Echo
    constructor() {
        this._socket = new Echo({
            broadcaster: 'pusher',
            key: process.env.MIX_PUSHER_APP_KEY,
            cluster: process.env.MIX_PUSHER_APP_CLUSTER,
            wsHost: window.location.hostname,
            wsPort: 6001,
            forceTLS: false,
        })
    }

    echo() {
        return this._socket
    }

}

export default Websocket;

