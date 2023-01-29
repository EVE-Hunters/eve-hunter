/// <reference types="vite/client" />

export const EchoSettings = {
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  wssPort: import.meta.env.VITE_PUSHER_PORT,
  forceTLS: import.meta.env.VITE_PUSHER_PORT === '443',
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
}
