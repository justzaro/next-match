'use client'

import { DateInput, DateValue, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function ProfileForm() {
    const { 
        register,
        getValues,
        setValue,
        formState: { errors,} 
    } = useFormContext();

    const genderList = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" }
    ]

    const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

    const handleConvertDate = (date: DateValue) => {
        const { day, month, year } = date;
        const selectedDate = new Date(year, month - 1, day);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(selectedDate);
        setValue('dateOfBirth', formattedDate);
        setSelectedDate(date);
    }

    return (
        <div className="space-y-4">
            <Select
                aria-label="Select gender"
                label="Gender"
                variant="bordered"
                {...register("gender")}
                errorMessage={errors.gender?.message as string}
                isInvalid={!!errors.gender}
                defaultSelectedKeys={getValues('gender')}
                onChange={e => setValue("gender", e.target.value)}
            >
                {genderList.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <DateInput
                label="Birth date"
                onChange={date => handleConvertDate(date)}
                defaultValue={selectedDate}
            >
            </DateInput>
            <Textarea
                label="Description"
                variant="bordered"
                {...register("description")}
                errorMessage={errors.description?.message as string}
                isInvalid={!!errors.description}
                defaultValue={getValues('description')}
            />
            <Input
                label="City"
                variant="bordered"
                {...register("city")}
                errorMessage={errors.city?.message as string}
                isInvalid={!!errors.city}
                defaultValue={getValues('city')}
            >
            </Input>
            <Input
                label="Country"
                variant="bordered"
                {...register("country")}
                errorMessage={errors.country?.message as string}
                isInvalid={!!errors.country}
                defaultValue={getValues('country')}
            >
            </Input>
        </div>
    )
}