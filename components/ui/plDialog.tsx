"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "./button"
import { Cross, ArrowLeft } from "lucide-react"

const Dialog = ({
    className,
    children,
    open,
    ...props
}: React.HTMLAttributes<HTMLDialogElement> & { open?: boolean }) => {
    const [isClient, setIsClient] = React.useState(false)
    const isMobile = useMediaQuery('(max-width: 768px)');
    const dialogRef = React.useRef<HTMLDialogElement>(null);
    const closeDialog = () => {
        dialogRef.current?.close();
    }
    React.useEffect(() => {
        if (open) {
            isMobile ? dialogRef.current?.show() : dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
        setIsClient(true)
    }, [open]);
    const mobileClass = isMobile ? `absolute w-screen h-screen rounded-none m-0 left-0 top-0` : "";
    if (!isClient) return null;
    return (
        <dialog ref={dialogRef} className={cn("bg-white rounded-lg relative", className, mobileClass)} {...props}>
            <Button onClick={closeDialog} variant={"ghost"} className={cn("absolute top-0", isMobile ? "left-0" : "right-0")}>
                {isMobile ? <ArrowLeft className="w-4 h-4" /> : <Cross className="w-4 h-4" />}
            </Button>
            {children}
        </dialog>
    );
}

Dialog.displayName = "PLDialog"

const DialogTrigger = ({
    dialogId,
    children,
    open,
    close,
}: { dialogId: string, children: React.ReactNode, open?: boolean, close?: boolean }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClick: (e: React.MouseEvent) => {
                    child.props.onClick?.(e);
                    const dialog = document.getElementById(dialogId) as HTMLDialogElement;
                    if (open) {
                        isMobile ? dialog?.show() : dialog?.showModal();
                    } else if (close) {
                        dialog?.close();
                    } else {
                        isMobile ? dialog?.show() : dialog?.showModal();
                    }
                }
            } as any);
        }
        return child;
    });
}

DialogTrigger.displayName = "PLDialogTrigger"



export { Dialog, DialogTrigger }