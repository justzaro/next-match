/* eslint-disable no-var */
import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

declare global {
    var pusherServerInstance: PusherServer | undefined;
    var pusherClientInstance: PusherClient | undefined;
}

if(!global.pusherServerInstance) {
    global.pusherServerInstance = new PusherServer({
        appId: process.env.PUSHER_APP_ID!,
        secret: process.env.PUSHER_SECRET!,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        useTLS: true
    })
}

if(!global.pusherClientInstance) {
    global.pusherClientInstance = new PusherClient(
        process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        {
           cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
           channelAuthorization: {
                endpoint: '/api/pusher-auth',
                transport: 'ajax'
           }
        },
    )
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;