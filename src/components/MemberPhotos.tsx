/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Photo } from "@prisma/client"
import DeleteButton from "./DeleteButton"
import MemberImage from "./MemberImage"
import StarButton from "./StarButton"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { deleteImage, setMainImage } from "@/app/actions/userActions"
import { toast } from "react-toastify"

type Props = {
    photos: Photo[] | null;
    editing?: boolean;
    mainImageUrl?: string | null;
}

export default function MemberPhotos({ photos, editing, mainImageUrl }: Props) {

    const router = useRouter();
    const [loading, setLoading] = useState({
        type: '',
        isLoading: false,
        id: ''
    })

    const onDelete = async(photo: Photo) => {
        if (photo.url === mainImageUrl) {
            return null;
        }
        setLoading({
            type: 'delete',
            isLoading: true,
            id: photo.id
        });
        await deleteImage(photo);
        router.refresh();
        setLoading({
            type: '',
            isLoading: false,
            id: ''
        });
    }

    const onSetMain = async (photo: Photo) => {
        if (photo.url === mainImageUrl) {
            return null;
        }
        setLoading({
            type: 'main',
            isLoading: true,
            id: photo.id
        });
        
        try {
            await setMainImage(photo);
            router.refresh();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading({
                type: '',
                isLoading: false,
                id: ''
            });
        }
    }

    return (
        <div className="grid grid-cols-5 gap-3 p-5">
            {photos?.map(photo => (
                <div key={photo.id} className="relative">
                    <MemberImage photo={photo} />
                    {editing && (
                        <>
                            <div onClick={() => onSetMain(photo)} className="absolute top-3 left-3 z-50">
                                <StarButton
                                    selected={photo.url === mainImageUrl}
                                    loading={
                                        loading.isLoading &&
                                        loading.type === 'main' &&
                                        loading.id === photo.id
                                    }
                                />
                            </div>
                            <div onClick={() => onDelete(photo)} className="absolute top-3 right-3 z-50">
                                <DeleteButton
                                    loading={
                                        loading.isLoading &&
                                        loading.type === 'delete' &&
                                        loading.id === photo.id
                                    }
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}