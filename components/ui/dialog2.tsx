"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface DialogContextProps {
    openDialog: () => void;
    closeDialog: () => void;
    isOpen: boolean;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
};

const DialogProvider: React.FC<{ children: ReactNode, open: boolean }> = ({ children, open }) => {
    const [isOpen, setIsOpen] = useState(open);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
            {children}
        </DialogContext.Provider>
    );
};
const Dialog: React.FC<{ children: ReactNode, open?: boolean }> = ({ children, open = false }) => {
    return (
        <DialogProvider open={open}>
            {children}
        </DialogProvider>
    );
};

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
    crossBtnPosition?: string;
}

const DialogContent: React.FC<DialogContentProps> = ({ children, className, crossBtnPosition = "right-0" }) => {
    const { isOpen, closeDialog } = useDialog();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isClient, setIsClient] = React.useState(false)
    const mobileClass = isMobile ? `absolute w-screen h-screen rounded-none m-0 left-0 top-0` : "";
    React.useEffect(() => {
        setIsClient(true)
    }, []);
    
    if (!isClient) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" onClick={closeDialog}>
                        <motion.div
                            className={cn("bg-white rounded-lg shadow-lg relative", className, mobileClass)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button onClick={closeDialog} variant={"ghost"} className={cn("absolute top-0", isMobile ? "left-0" : crossBtnPosition)}>
                                {isMobile ? <ArrowLeft className="w-4 h-4" /> : 'X'}
                            </Button>
                            {children}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};



const DialogTrigger = ({
    children,
    open,
    close,
}: { children: React.ReactNode, open?: boolean, close?: boolean }) => {
    const { openDialog, closeDialog } = useDialog();
    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClick: (e: React.MouseEvent) => {
                    child.props.onClick?.(e);
                    if (open) {
                        openDialog();
                    } else if (close) {
                        closeDialog();
                    } else {
                        openDialog();
                    }
                }
            } as any);
        }
        return child;
    });
}

DialogTrigger.displayName = "PLDialogTrigger"

export { Dialog, DialogTrigger, DialogContent, useDialog };
