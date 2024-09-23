import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/utils";

type Props = {
    params: {
        userId: string
    }
}

export default async function ChatPage({ params }: Props) {

    const userId = await getAuthUserId();
    const messages = await getMessageThread(params.userId);
    const recipientUserId = params.userId;
    const chatId = createChatId(userId, recipientUserId);

    return (
        <CardInnerWrapper
            header="Chat"
            body={
                <MessageList
                    initialMessages={messages}
                    currentUserId={userId}
                    chatId={chatId}
                />
            }
            footer={<div><ChatForm /></div>}
        />
    )
}