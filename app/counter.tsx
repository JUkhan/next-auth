'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSelector, write, read } from '@/app/appState';

const decrement = () => {
    write(state =>{
        const counter={...state.counter};
        counter.count--;
        return {counter}
    });
};

const increment = () => {
    write(state => ({ counter: { count: state.counter.count! + 1, loading: false } }));
};

const asyncInc = () => {
    write(state => ({ counter: { ...state.counter, loading: true } }));
    setTimeout(() => {
        write(state => ({ counter: { count: state.counter.count! + 1, loading: false } }));
    }, 1000);
}

const Counter: React.FC = () => {
    const {count, loading} = useSelector(state => state.counter);

    const loadingText = loading ? "Loading..." : count;
    
    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Counter: {loadingText}</h2>
            <div className="flex space-x-4">
                <Button onClick={decrement}>Decrease</Button>
                <Button onClick={increment}>Increase</Button>
                <Button onClick={asyncInc}>AsyncIncrease</Button>
            </div>
        </div>
    );
};

export default Counter;
