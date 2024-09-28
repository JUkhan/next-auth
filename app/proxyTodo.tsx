'use client';

import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProxyState } from '@/nanoState';

type Model = {
    visibility: 'all' | 'active' | 'completed';
    items: {
        id: number;
        text: string;
        completed: boolean;
    }[];
    newTodo: string;
}
const initialState: Model = { visibility: 'all', items: [], newTodo: '' }
const useController = (model: Model) => useMemo(() => ({
    addTodo() {
        if (model.newTodo.trim()) {
            model.items = [...model.items, { id: Date.now(), text: model.newTodo.trim(), completed: false }];
            model.newTodo = "";
        }
    },
    toggleTodo(id: number) {
        model.items = model.items.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
    },
    setVisibility(newVisibility: 'all' | 'active' | 'completed') {
        model.visibility = newVisibility
    }
}), [model])

const Todo: React.FC = () => {
    const model = useProxyState(initialState);
    const todoController = useController(model);

    const filteredTodos = useMemo(() => model.items.filter(todo => {
        if (model.visibility === 'active') return !todo.completed;
        if (model.visibility === 'completed') return todo.completed;
        return true;
    }), [model.items, model.visibility]);

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Proxy Todo List</h2>
            <div className="flex space-x-2">
                <Input
                    type="text"
                    value={model.newTodo}
                    onChange={(e) => model.newTodo = e.target.value}
                    placeholder="Add new todo"
                />
                <Button onClick={todoController.addTodo}>Add</Button>
            </div>
            <div className="flex space-x-2">
                <Button onClick={() => todoController.setVisibility('all')}>All</Button>
                <Button onClick={() => todoController.setVisibility('active')}>Active</Button>
                <Button onClick={() => todoController.setVisibility('completed')}>Completed</Button>
            </div>
            <ul className="space-y-2">
                {filteredTodos.map(todo => (
                    <li key={todo.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => todoController.toggleTodo(todo.id)}
                        />
                        <span className={todo.completed ? 'line-through' : ''}>
                            {todo.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;
