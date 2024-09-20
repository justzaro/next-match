import { getMessagesByContainer } from "../actions/messageActions";
import MessageSideBar from "./MessageSideBar";
import MessageTable from "./MessageTable";

type Props = {
  searchParams: {
    container: string;
  }
}

export default async function MessagesPage({ searchParams } : Props) {

  const messages = await getMessagesByContainer(searchParams.container);
  console.log(messages);

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSideBar />
      </div>
      <div className="col-span-10">
          <MessageTable messages={messages}/>
      </div>
    </div>
  )
}