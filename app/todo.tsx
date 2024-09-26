'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSelector, write } from '@/app/appState';

const Todo: React.FC = () => {
    const [newTodo, setNewTodo] = useState('');
    const { items, visibility } = useSelector(state => state.todos);

    const addTodo = () => {
        if (newTodo.trim()) {
            write(state => ({
                todos: {
                    ...state.todos,
                    items: [
                        ...state.todos.items,
                        {
                            id: Date.now(),
                            text: newTodo.trim(),
                            completed: false
                        }
                    ]
                }
            }));
            setNewTodo('');
        }
    };

    const toggleTodo = (id: number) => {
        write(state => ({
            todos: {
                ...state.todos,
                items: state.todos.items!.map(todo =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            }
        }));
    };

    const filteredTodos = items.filter(todo => {
        if (visibility === 'active') return !todo.completed;
        if (visibility === 'completed') return todo.completed;
        return true;
    });

    const setVisibility = (newVisibility: 'all' | 'active' | 'completed') => {
        write(state => ({
            todos: { ...state.todos, visibility: newVisibility }
        }));
    };
    
    return (
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Todo List</h2>
            <div className="flex space-x-2">
                <Input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <Button onClick={addTodo}>Add</Button>
            </div>
            <div className="flex space-x-2">
                <Button onClick={() => setVisibility('all')}>All</Button>
                <Button onClick={() => setVisibility('active')}>Active</Button>
                <Button onClick={() => setVisibility('completed')}>Completed</Button>
            </div>
            <ul className="space-y-2">
                {filteredTodos.map(todo => (
                    <li key={todo.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
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
