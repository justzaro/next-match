import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js"
import { useRef, useEffect, useCallback } from "react"
import useMessageStore from "./useMessageStore";
import { newMessageToast } from "@/components/NewMessageToast";

export const useNotificationChannel = (userId: string | null, profileComplete: boolean) => {
    const channelRef = useRef<Channel | null>();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const add = useMessageStore(state => state.add);
    const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);

    const handleNewMessage = useCallback((message: MessageDto) => {
        if(pathname === '/messages' && searchParams.get('container') !== 'inbox') {
            add(message);
            updateUnreadCount(1);
            newMessageToast(message);
        } else if(pathname !== `/members/${message.senderId}/chat`) {
            updateUnreadCount(1);
        }
    }, [add, pathname, searchParams, updateUnreadCount]);

    useEffect(() => {
      if(!userId || !profileComplete) {
        return;
      }
      if(!channelRef.current) {
        channelRef.current = pusherClient.subscribe(`private-${userId}`);
        channelRef.current.bind('message:new', handleNewMessage);
      }

      return () => {
        if(channelRef.current && channelRef.current.subscribed) {
            channelRef.current.unsubscribe();
            channelRef.current.unbind('message:new', handleNewMessage);
            channelRef.current = null;
        }
      }
    }, [userId, profileComplete, handleNewMessage]);
    
}