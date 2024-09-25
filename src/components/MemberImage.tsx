/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useRole";
import { Button, Image, useDisclosure } from "@nextui-org/react";
import { Photo } from "@prisma/client"
import clsx from "clsx";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import AppModal from "./AppModal";

type Props = {
  photo: Photo | null;
}

export default function MemberImage({ photo }: Props) {
  const role = useRole();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!photo) return null;

  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="cursor-pointer" onClick={onOpen}>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.url}
          width={340}
          height={340}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved && role !== "ADMIN"
          })}
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url || '/images/user.png'}
          alt="Image of user"
        />
      )}
      {!photo?.isApproved && role !== "ADMIN" && (
        <div className="abosulute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex jsutify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}
      {role === "ADMIN" && (
        <div className="flex flex-row gap-2 mt-2">
          <Button
            color="success"
            variant="bordered"
            fullWidth
            onClick={() => approve(photo.id)}
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            color="danger"
            variant="bordered"
            fullWidth
            onClick={() => reject(photo)}
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
      <AppModal
        imageModal={true}
        isOpen={isOpen}
        onClose={onClose}
        body={
          <>
            {photo?.publicId ? (
              <CldImage
                alt="Image of member"
                src={photo.url}
                width={750}
                height={750}
                crop="fill"
                gravity="faces"
                className={clsx("rounded-2xl", {
                  "opacity-40": !photo.isApproved && role !== "ADMIN"
                })}
              />
            ) : (
              <Image
                width={750}
                height={750}
                src={photo?.url || '/images/user.png'}
                alt="Image of user"
              />
            )}
          </>
        }
      />
    </div>
  )
}