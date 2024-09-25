import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type Props = {
    isSubmitting: boolean;
    isLoggedIn: boolean;
}

export default function SocialLogin({isSubmitting, isLoggedIn} : Props) {

    const onClick = (provider: "google" | "github") => {
        signIn(provider, {
            callbackUrl: "/members"
        })
    }

  return (
    <div className="flex items-center w-full gap-2">
        <Button
            size="lg"
            fullWidth
            variant="bordered"
            onClick={() => onClick('google')}
            isDisabled={isSubmitting || isLoggedIn}
        >
            <FcGoogle size={22}/>
        </Button>
        <Button
            size="lg"
            fullWidth
            variant="bordered"
            onClick={() => onClick('github')}
            isDisabled={isSubmitting || isLoggedIn}
        >
            <FaGithub size={22}/>
        </Button>
    </div>
  )
}