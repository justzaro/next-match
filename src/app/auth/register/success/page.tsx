'use client'

import CardWrapper from "@/components/CardWrapper";
import { useRouter } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa";

export default function RegisterSuccessPage() {
    const router = useRouter();

  return (
    <CardWrapper
        headerText="You have successfully registred!"
        subHeaderText="Please, verify your email first before logging in the app."
        action={() => router.push('/auth/login')}
        actionLabel="Go to login"
        headerIcon={FaCheckCircle}
    />
  )
}