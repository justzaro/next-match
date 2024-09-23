import { useCallback, useEffect, useRef } from "react";
import useLikesStore from "./useLikesStore"
import { Channel } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import { Like, User } from "@prisma/client";
import { newLikeToast } from "@/components/NewLikeToast";

export const useLikesChannel = (userId: string | null) => {
    const channelRef = useRef<Channel | null>(null);
    const addLike = useLikesStore(state => state.add);

    const handleAddLike = useCallback(({user, like} :{user: User, like: Like}) => {
        addLike(like);
        newLikeToast(user);
    }, [addLike]);

    useEffect(() => {
        if(!userId) {
          return;
        }
        if(!channelRef.current) {
          channelRef.current = pusherClient.subscribe(`private-${userId}`);
          channelRef.current.bind('like:new', handleAddLike);
        }
  
        return () => {
          if(channelRef.current && channelRef.current.subscribed) {
              channelRef.current.unsubscribe();
              channelRef.current.unbind('like:new', handleAddLike);
              channelRef.current = null;
          }
        }
      }, [userId, handleAddLike]);
}