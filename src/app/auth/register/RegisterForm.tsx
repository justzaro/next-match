'use client'

import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchemas";
import { handleFormServerErrors } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function RegisterForm() {

    const { 
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched"
    });

    const onSubmit = async (data: RegisterSchema) => {
        const result = await registerUser(data);
        
        if(result.status === 'success') {
            console.log('User registered successfull!');
        } else {
            handleFormServerErrors(result, setError);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            size="lg"
                            label="Name"
                            variant="bordered"
                            {...register("name")}
                            errorMessage={errors.name?.message}
                            isInvalid={!!errors.name}
                        >
                        </Input>
                        <Input
                            size="lg"
                            label="Email"
                            variant="bordered"
                            {...register("email")}
                            errorMessage={errors.email?.message}
                            isInvalid={!!errors.email}
                        >
                        </Input>
                        <Input
                            size="lg"
                            label="Password"
                            variant="bordered"
                            type="password"
                            {...register("password")}
                            errorMessage={errors.password?.message}
                            isInvalid={!!errors.password}
                        >
                        </Input>
                        {errors.root?.serverError && (
                            <p className="text-danger text-sm">{errors.root.serverError.message}</p>
                        )}
                        <Button
                            color="secondary"
                            type="submit"
                            size="lg"
                            className="text-xl"
                            isLoading={isSubmitting}
                            fullWidth
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}