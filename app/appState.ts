import { createState } from "@/nanoState";
export type AppState = {
    counter: {
        count: number;
        loading: boolean;
    };
    todos: {
        visibility:'all'|'active'|'completed';
        items: {
            id: number;
            text: string;
            completed: boolean;
        }[];
    };
    newTodo:string;
}

export const {read, write, dispatch, useStoreEffect, useSelector} = createState<AppState>({
    counter: {
        count: 0,
        loading: false,
    },
    todos: {
        visibility:'all',
        items: [],
    },
    newTodo:'',
});