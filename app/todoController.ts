import { setState, select, type AppState } from '@/app/appState';

export default {
    addTodo() {
        const newTodo = select(state => state.newTodo);
        if (newTodo.trim()) {
            const todos = select(state => state.todos);
            todos.items.push({ id: Date.now(), text: newTodo.trim(), completed: false });
            setState({ todos });
            setState({ newTodo: "" });
        }
    },
    toggleTodo(id: number){
        const todos = select(state => state.todos);
        todos.items = todos.items.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setState({ todos });
    },
    setVisibility(newVisibility: 'all' | 'active' | 'completed') {
        setState(state => ({
            todos: { ...state.todos, visibility: newVisibility }
        }));
    },
    todoSelector : (state: AppState) => state.todos,
    newTodoSelector : (state: AppState) => state.newTodo
}
