'use server'

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    const userId = await getAuthUserId();

    try {
        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                }
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const userId = await getAuthUserId();

        const likedIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })
        console.log(likedIds);
        console.log(likedIds.map(like => like.targetUserId));
        return likedIds.map(like => like.targetUserId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthUserId();

        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);
            case 'target':
                return await fetchTargetLikes(userId);
            case 'mutual':
                return await fetchMutualLikes(userId);
            default:
                return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchSourceLikes(userId: string) {
    try {
        const sourceList = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetMember: true
            }
        })
    
        return sourceList.map(x => x.targetMember);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchTargetLikes(userId: string) {
    try {
        const targetList = await prisma.like.findMany({
            where: {
                targetUserId: userId
            },
            select: {
                sourceMember: true
            }
        })
    
        return targetList.map(x => x.sourceMember);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchMutualLikes(userId: string) {
    const likedUsers = await prisma.like.findMany({
        where: {
            sourceUserId: userId
        },
        select: {
            targetUserId: true
        }
    })

    const likedIds = likedUsers.map(x => x.targetUserId);

    const mutualList = await prisma.like.findMany({
        where: {
            AND: [
                { targetUserId: userId },
                { sourceUserId: {in: likedIds} }
            ]
        },
        select: {
            sourceMember: true
        }
    })

    return mutualList.map(x => x.sourceMember);
}
