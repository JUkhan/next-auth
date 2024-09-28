'use client';

import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setState, useSelector, useStateEffect } from '@/app/appState';
import todoController from './todoController';

const Todo: React.FC = () => {
    const newTodo = useSelector(todoController.newTodoSelector);
    const { items, visibility } = useSelector(todoController.todoSelector);
    useStateEffect(action => action.type === 'by', action => {
        console.log(`incremented by ${action.val}`);
    })

    const filteredTodos = useMemo(() => items.filter(todo => {
        if (visibility === 'active') return !todo.completed;
        if (visibility === 'completed') return todo.completed;
        return true;
    }), [items, visibility]);

    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Todo List</h2>
            <div className="flex space-x-2">
                <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setState({ newTodo: e.target.value })}
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
