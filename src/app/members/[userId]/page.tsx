import { getMemberByUserId } from "@/app/actions/memberActions"
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { notFound } from "next/navigation";

type Props = {
    params: {
        userId: string
    }
}

export default async function MemberDetailedPage({params}:Props) {
    const member = await getMemberByUserId(params.userId);

    if (!member) {
        return notFound();
    }

    return (
        <CardInnerWrapper
            header="Profile"
            body={<div>{member.description}</div>}
        />
    )
}