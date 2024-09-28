'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSelector, dispatch } from '@/app/appState';
import counterController from './counterController'


const Counter: React.FC = () => {
    const { count, loading } = useSelector(counterController.counterSelector);

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Counter: {count}</h2>
            <div className="flex space-x-4">
                <Button onClick={counterController.decrement}>Decrease</Button>
                <Button onClick={() => dispatch(counterController.increment(10))}>Increase</Button>
                <Button disabled={loading} onClick={counterController.asyncInc}>
                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    AsyncIncrease
                </Button>
            </div>
        </div>
    );
};

export default Counter;
