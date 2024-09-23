import { Like } from "@prisma/client"
import { create } from "zustand";
import { devtools } from 'zustand/middleware';

type LikesStore = {
    likes: Like[];
    add: (like: Like) => void;
}

const useLikesStore = create<LikesStore>()(devtools((set) => ({
    likes: [],
    add: (like) => set(state => ({likes: [...state.likes, like]}))
}), {name: 'LikesStore'}));

export default useLikesStore;