'use client'

import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ReactNode } from "react";
import { setTimeout } from "timers";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    header?: string;
    body: ReactNode;
    footerButtons?: ButtonProps[];
    imageModal?: boolean;
}

export default function AppModal({
    isOpen, onClose, header, body, footerButtons, imageModal
}: Props) {

    const handleClose = () => {
        setTimeout(() => onClose(), 10);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            placement="top-center"
            classNames={{
                base: `${imageModal ? "border-white" : ""}`,
                body: `${imageModal ? "p-0" : ""}`
            }}
        >
            <ModalContent>
                {!imageModal && (
                    <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
                )}
                <ModalBody>
                    {body}
                </ModalBody>
                {!imageModal && (
                    <ModalFooter>
                        {footerButtons?.map((props: ButtonProps, index) => (
                            <Button {...props} key={index}>
                                {props.children}
                            </Button>
                        ))}
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    )
}