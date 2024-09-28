import { createState } from "@jukhan/nano-state";
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

export const {getState, setState, dispatch, useStateEffect, useSelector, select} = createState<AppState>({
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