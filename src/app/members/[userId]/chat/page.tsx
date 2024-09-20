import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";

type Props = {
    params: {
        userId: string
    }
}

export default async function ChatPage({ params }: Props) {

    const userId = await getAuthUserId();
    const messages = await getMessageThread(params.userId);

    const body = (
        <div>
            {messages.length === 0 ? 'No messages to display' : (
                <div>
                    {messages.map(message => (
                        <MessageBox key={message.id} message={message} currentUserId={userId}/>
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <CardInnerWrapper
            header="Chat"
            body={body}
            footer={<div><ChatForm /></div>}
        />
    )
}