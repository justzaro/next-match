import { transformImageUrl } from "@/lib/utils";
import { Image } from "@nextui-org/react";
import { User } from "@prisma/client";
import Link from "next/link";
import { toast } from "react-toastify";

type Props = {
    message: User
}

export default function NewMessageToast({ message }: Props) {
    return (
        <Link
            href={`/members/${message.id}`}
            className="flex items-center"
        >
            <div className="mr-2">
                <Image
                    src={transformImageUrl(message.image) || '/images/user.png'}
                    height={50}
                    width={50}
                    alt="Sender image"
                />
            </div>
            <div className="flex flex-grow flex-col justify-center">
                <div className="font-semibold">
                    {message.name} liked you!
                </div>
                <div className="text-sm">Click to view!</div>
            </div>
        </Link>
    )
}

export const newLikeToast = (message: User) => {
    toast(<NewMessageToast message={message}/>);
};