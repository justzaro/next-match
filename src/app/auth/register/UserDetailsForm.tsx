'use client'

import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function UserDetailsForm() {
    const { 
        register,
        getValues,
        formState: {
            errors
        }
     } = useFormContext();
    return (
        <div className="space-y-4">
            <Input
                size="lg"
                label="Name"
                variant="bordered"
                {...register("name")}
                errorMessage={errors.name?.message as string}
                isInvalid={!!errors.name}
                defaultValue={getValues('name')}
            >
            </Input>
            <Input
                size="lg"
                label="Email"
                variant="bordered"
                {...register("email")}
                errorMessage={errors.email?.message as string}
                isInvalid={!!errors.email}
                defaultValue={getValues('email')}
            >
            </Input>
            <Input
                size="lg"
                label="Password"
                variant="bordered"
                type="password"
                {...register("password")}
                errorMessage={errors.password?.message as string}
                isInvalid={!!errors.password}
                defaultValue={getValues('password')}
            >
            </Input>
        </div>
    )
}