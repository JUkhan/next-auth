"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog2';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from 'usehooks-ts';


const MotionPage: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Motion</h1>
                <p className="text-gray-600 mb-6">This is a simple example of Framer Motion animations.</p>
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p>This content is visible.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Dialog>
                    <DialogTrigger>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Click me!
                        </motion.button>
                    </DialogTrigger>
                    <DialogContent className="w-[300px] h-[300px]">
                        <h2>Dialog Title</h2>
                        <p>This is a dialog box.</p>
                        <DialogTrigger close>
                            <Button>Close</Button>
                        </DialogTrigger>
                    </DialogContent>
                </Dialog>
            </motion.div>

        </div>
    );
};

export default MotionPage;
