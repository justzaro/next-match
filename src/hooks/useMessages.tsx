import { deleteMessage } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { Key } from "readline";
import useMessageStore from "./useMessageStore";

export const useMessages = (initialMessages: MessageDto[]) => {
    
    // const { set, add, messages } = useMessageStore(state => ({
    //     set: state.set,
    //     add: state.add,
    //     messages: state.messages
    // }));

    const set = useMessageStore(state => state.set);
    const add = useMessageStore(state => state.add);
    const remove = useMessageStore(state => state.remove);
    const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);
    const messages = useMessageStore(state => state.messages);

    const searchParms = useSearchParams();
    const router = useRouter();
    const isOutbox = searchParms.get('container') === 'outbox';
    const [isDeleting, setIsDeleting] = useState({
        id: '',
        loading: false
    })

    useEffect(() => {
        set(initialMessages);
        return () => {
            set([]);
        }
    }, [initialMessages, set]);

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
        messages
    }
}