import { deleteMessage, getMessagesByContainer } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useRef, Key } from "react";
import useMessageStore from "./useMessageStore";

export const useMessages = (initialMessages: MessageDto[], nextCursor?: string) => {
    
    const { 
        set,
        remove,
        updateUnreadCount,
        messages,
        resetMessages 
    } = useMessageStore();

    const cursorRef = useRef(nextCursor);
    const searchParms = useSearchParams();
    const router = useRouter();
    const isOutbox = searchParms.get('container') === 'outbox';
    const container = searchParms.get('container');
    const [isDeleting, setIsDeleting] = useState({
        id: '',
        loading: false
    });
    const [loadingMore, setLoadingMore] = useState(false);


    const loadMore = useCallback(async () => {
        if(cursorRef.current) {
            setLoadingMore(true);
            const { messages, nextCursor } = await getMessagesByContainer(container, cursorRef.current);
            set(messages);
            cursorRef.current = nextCursor;
            setLoadingMore(false);
        }
    }, [container, set]);

    useEffect(() => {
        cursorRef.current = nextCursor;
        set(initialMessages);
        return () => {
            resetMessages();
        }
    }, [initialMessages, set, resetMessages, nextCursor]);

    const columns = [
        {
            key: isOutbox ? 'recipientName' : 'senderName',
            label: isOutbox ? 'Recipient' : 'Sender'
        },
        { key: 'text', label: 'Message' },
        { key: 'created', label: isOutbox ? 'Date sent' : 'Date received' },
        { key: 'actions', label: 'Actions' },
    ];

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setIsDeleting({
            id: message.id,
            loading: true
        });
        await deleteMessage(message.id, isOutbox);
        remove(message.id);
        if(!message.dateRead && !isOutbox) {
            updateUnreadCount(-1);
        }
        setIsDeleting({
            id: '',

            loading: false
        });
    }, [isOutbox, remove, updateUnreadCount])

    const handleRowSelect = (key: Key) => {
        const message = initialMessages.find(m => m.id === key);
        const senderUrl = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(senderUrl + '/chat');
    }

    return {
        isOutbox,
        columns,
        deleteMessage: handleDeleteMessage,
        selectRow: handleRowSelect,
        isDeleting,
        messages,
        loadMore,
        loadingMore,
        hasMore: !!cursorRef.current
    }
}