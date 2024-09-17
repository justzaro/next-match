import { Spinner } from "@nextui-org/react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center vertical-center">
            <Spinner label="Loaing" color="secondary" labelColor="secondary" />
        </div>
    )
}