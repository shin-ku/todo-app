import { useState, useEffect, useMemo } from 'react';
import type { Todo, TodoFormData, FilterType, Priority } from './types/todo';
import { loadTodos, saveTodos, generateId } from './utils/storage';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterTag, setFilterTag] = useState<string>('');

  useEffect(() => {
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = (formData: TodoFormData) => {
    const newTodo: Todo = {
      id: generateId(),
      ...formData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    todos.forEach((todo) => {
      todo.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filterType === 'active' && todo.completed) return false;
      if (filterType === 'completed' && !todo.completed) return false;

      if (filterPriority !== 'all' && todo.priority !== filterPriority) return false;

      if (filterTag && !todo.tags.includes(filterTag)) return false;

      return true;
    });
  }, [todos, filterType, filterPriority, filterTag]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>TODOアプリ</h1>
        <div className="stats">
          <span>全体: {stats.total}</span>
          <span>未完了: {stats.active}</span>
          <span>完了: {stats.completed}</span>
        </div>
      </header>

      <main className="app-main">
        <div className="todo-form-section">
          <h2>新しいタスクを追加</h2>
          <TodoForm onSubmit={handleAddTodo} />
        </div>

        <div className="todo-list-section">
          <h2>タスク一覧</h2>
          <TodoFilter
            filterType={filterType}
            filterPriority={filterPriority}
            filterTag={filterTag}
            allTags={allTags}
            onFilterTypeChange={setFilterType}
            onFilterPriorityChange={setFilterPriority}
            onFilterTagChange={setFilterTag}
          />

          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <p className="empty-message">
                {filterType === 'all'
                  ? 'タスクがありません。上のフォームから追加してください。'
                  : 'フィルターに一致するタスクがありません。'}
              </p>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onUpdate={handleUpdateTodo}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
