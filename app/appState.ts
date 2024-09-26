import { createStore } from "@/store";
export type AppState = {
    counter: {
        count: number;
        loading: boolean;
    };
    todos: {
        visibility:'all'|'active'|'completed'
        items: {
            id: number;
            text: string;
            completed: boolean;
        }[];
    };
}

export const {read, write, dispatch, useStoreEffect, useSelector} = createStore<AppState>({
    counter: {
        count: 0,
        loading: false,
    },
    todos: {
        visibility:'all',
        items: [],
    }
});