import PaginationComponent from "@/components/PaginationComponent";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions";
import MemberCard from "./MemberCard";
import { GetMemberParams } from "@/types";
import EmptyState from "@/components/EmptyState";

type Props = {
  searchParams: GetMemberParams;
}

export default async function MembersPage({ searchParams }: Props) {

  const { items: members, totalCount  } = await getMembers(searchParams);
  const likedIds = await fetchCurrentUserLikeIds();

  return (
    <>
      {!members || members.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            {members && members.map(member => (
              <MemberCard member={member} key={member.id} likedIds={likedIds} />
            ))}
          </div>
          <PaginationComponent totalCount={totalCount}/>
        </>
      )}
    </>
  )
}