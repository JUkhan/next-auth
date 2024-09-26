import { useState, useEffect } from 'react';
import { shallowEqual } from './shallowEqual';
export function createStore<T extends object>(initialValue: T): {
    read: () => T;
    write: (fn: (state: T) => Partial<T>) => void;
    dispatch: (action: any) => void;
    useStoreEffect: (matcher: (action: any) => boolean, callback: (action: any) => void) => void;
    useSelector: <S>(selector: (state: T) => S) => S;
} {
    let value = initialValue;
    const subscribers = new Set<(value: T) => void>();
    const dispatcher = new Set<(value: any) => void>  ();
    const read = () => Object.assign({}, value) as T;

    const write = (fn: (state: T) => Partial<T>) => {
        value = Object.assign({}, value, fn(value));
        subscribers.forEach(subscriber => subscriber(value));
    };

    const subscribe = (subscriber: (value: T) => void) => {
        subscribers.add(subscriber);
        return () => subscribers.delete(subscriber);
    };
    const useSelector = <S>(selector: (state: T) => S): S => {
        const [value, setValue] = useState(selector(read()));
        useEffect(() => {
            const unsubscribe = subscribe((newValue: T) => {
                const selectedValue = selector(newValue);
                if (!shallowEqual(selectedValue, value)) {
                    setValue(_ => selectedValue);
                }
            });
            return () => {
                unsubscribe();
            };
        }, [selector, value]);
        return value;
    };
    const useStoreEffect = (matcher: (value: any) => boolean, callback: (value: any) => void) => {
        useEffect(() => {
            const unsubscribe = subscribeForDispatcher((newValue) => {
                if (matcher(newValue)) {
                    callback(newValue);
                }
            });
            return () => {
                unsubscribe();
            };
        }, [matcher, callback]);
    };
    const subscribeForDispatcher = (subscriber: (value: T) => void) => {
        dispatcher.add(subscriber);
        return () => dispatcher.delete(subscriber);
    };
    const dispatch = (action: any) => {
        dispatcher.forEach(subscriber => subscriber(action));
    };

    return {read, write, dispatch, useStoreEffect, useSelector};
}
