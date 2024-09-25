'use client'

import { profileSchema, registerSchema, RegisterSchema } from "@/lib/schemas/registerSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import UserDetailsForm from "./UserDetailsForm";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import { registerUser } from "@/app/actions/authActions";
import { handleFormServerErrors } from "@/lib/utils";
import { useRouter } from "next/navigation";

const stepSchemas = [registerSchema, profileSchema];

export default function RegisterForm() {
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = stepSchemas[activeStep];
    const router = useRouter();

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(currentValidationSchema),
        mode: "onTouched"
    });

    const {
         handleSubmit,
          getValues,
          setError,
          formState: { errors, isSubmitting, isValid } 
        } = methods;

    const onSubmit = async () => {
        const result = await registerUser(getValues());

        if (result.status === 'success') {
            router.push("/auth/register/success");
        } else {
            handleFormServerErrors(result, setError);
        }
    }

    const getStepContent = (step: number) => {
        switch(step) {
            case 0:
                return <UserDetailsForm />
            case 1:
                return <ProfileForm /> 
            default:
                return 'Unknown step';
        }
    }

    const onBack = () => {
        setActiveStep(prevState => prevState - 1);
    }

    const onNext = async () => {
        if(activeStep === stepSchemas.length - 1) {
            await onSubmit();
        } else {
            setActiveStep(prev => prev + 1);
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex items-center justify-center">
                <div className="flex flex-col items-center text-secondary">
                    <div className="flex flex-row gap-3 items-center">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">LogIn</h1>
                    </div>
                    <h1 className="text-neutral-500">Welcome to NextMatch!</h1>
                </div>
            </CardHeader>
            <CardBody>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onNext)}>
                        <div className="space-y-4">
                            {getStepContent(activeStep)}
                            {errors.root?.serverError && (
                                <p className="text-danger text-sm">{errors.root.serverError.message}</p>
                            )}
                            <div className="flex flex-row items-center gap-6">
                                {activeStep !== 0 && (
                                    <Button onClick={onBack} fullWidth>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    color="secondary"               
                                    isLoading={isSubmitting}
                                    isDisabled={!isValid}
                                    fullWidth
                                >
                                    {activeStep === stepSchemas.length - 1 ? 'Submit' : 'Continue' }
                                </Button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </CardBody>
        </Card>
    )
}