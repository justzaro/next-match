'use client'

import { generateResetPasswordEmail } from "@/app/actions/authActions";
import CardWrapper from "@/components/CardWrapper";
import ResultMessage from "@/components/ResultMessage";
import { ActionResult } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form"
import { GiPadlock } from "react-icons/gi";

export default function ForgottenPasswordForm() {
    const [result, setResult] = useState<ActionResult<string> | null>(null);
    const { 
        register,
        handleSubmit,
        reset,
        formState: {
            isSubmitting,
            isValid
        }
    }
     = useForm();

     const onSubmit = async (data: FieldValues) => {
        setResult(await generateResetPasswordEmail(data.email));
        reset();
     }

  return (
    <CardWrapper
        headerIcon={GiPadlock}
        headerText="Forgot password"
        subHeaderText="Please enter your email address and we will send you a link to reset your password."
        body={
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                <Input
                    type="email"
                    placeholder="Email address"
                    variant="bordered"
                    defaultValue=""
                    size="lg"
                    {...register("email", {
                        required: true
                    })}
                />
                <Button
                    type="submit"
                    color="secondary"
                    isLoading={isSubmitting}
                    isDisabled={!isValid}
                    fullWidth
                >
                    Send reset email
                </Button>
                </div>
            </form>
        }
        footer={
            <ResultMessage result={result}/>
        }
    />
  )
}