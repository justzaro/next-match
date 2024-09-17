'use client'

import { singInUser } from "@/app/actions/authActions";
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";

export default function LoginForm() {
    const router = useRouter();

    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
        defaultValues: {
            email: "",
            password: ""
        }
    });
  
    const onSubmit = async (data: LoginSchema) => {
        const result = await singInUser(data);

        if(result.status === "success") {
            router.push("/members");
            router.refresh();
        } else {
            toast.error(result.error as string);
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
                    <h1 className="text-neutral-500">Welcome back to NextMatch!</h1>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
            
                    <div className="space-y-4">
                        <Input
                            size="lg"
                            label="Email"
                            variant="bordered"
                            {...register("email")}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            size="lg"
                            label="Password"
                            variant="bordered"
                            type="password"
                            {...register('password')}
                            errorMessage={errors.password?.message}
                            isInvalid={!!errors.password}
                        />
                        {errors.root && (
                            <div className="text-red-500">{errors.root.message} p</div>
                        )}
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={isSubmitting} 
                            fullWidth 
                            color="secondary" 
                            type="submit" 
                            size="lg">
                        {isSubmitting ? 'Loading...' : 'Log in'}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}