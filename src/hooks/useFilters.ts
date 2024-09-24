import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaMale, FaFemale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect, useTransition } from "react";
import { Selection } from "@nextui-org/react";
import usePaginationStore from "./usePaginationStore";

export const useFilters = () => {
    const pathname = usePathname();

    const router = useRouter();

    const { 
        filters,
        setFilters
     } = useFilterStore();
    const [isPending, startTransition] = useTransition();

    const { gender, ageRange, orderBy, withPhoto } = filters;
    const { pagination: { pageNumber, pageSize, totalCount }, setPage } = usePaginationStore();

    const orderByList = [
        { label: 'Last active', value: 'updated' },
        { label: 'Newest members', value: 'created' },
    ];

    const genderList = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ];

    useEffect(() => {
        if(gender || ageRange || orderBy || withPhoto) {
            setPage(1);
        }
    }, [gender, ageRange, orderBy, withPhoto, setPage])

    useEffect(() => {
        startTransition(() => {
            const searchParams = new URLSearchParams();

            if(gender) searchParams.set('gender', gender.join(','));
            if(ageRange) searchParams.set('ageRange', ageRange.toString());
            if(orderBy) searchParams.set('orderBy', orderBy);
            if(pageSize) searchParams.set('pageSize', pageSize.toString());
            if(pageNumber) searchParams.set('pageNumber', pageNumber.toString());
            searchParams.set('withPhoto', String(withPhoto));
            
            router.replace(`${pathname}?${searchParams}`);
        });
    }, [ageRange, gender, orderBy, pathname, pageSize, pageNumber, router, withPhoto]);

    
    const handleAgeSelect = (value: number[]) => {
        setFilters('ageRange', value);
    }

    const handleOrderSelect = (value: Selection) => {
        if(value instanceof Set) {
            const selectedValue = value.values().next().value;
            if(selectedValue) {
                setFilters('orderBy', selectedValue);
            }
        }
    }

    const handleGenderSelect = (value: string) => {
        if(gender.includes(value)) {
            setFilters('gender', gender.filter(g => g !== value));
        } else {
            setFilters('gender', [...gender, value]);
        }
    }

    const handleWithPhotoChange = () => {
        setFilters('withPhoto', !withPhoto);
    }

    return {
        totalCount,
        filters,
        orderByList,
        genderList,
        isPending,
        selectAge: handleAgeSelect,
        selectGender: handleGenderSelect,
        selectOrder: handleOrderSelect,
        selectWithPhoto: handleWithPhotoChange
    }
}