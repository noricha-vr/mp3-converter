import React, { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { CategoryFilter } from './components/CategoryFilter';
import './App.css';

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredTasks = useMemo(() => {
    if (!selectedCategory) return tasks;
    return tasks.filter(task => task.category === selectedCategory);
  }, [tasks, selectedCategory]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>OtoDake</h1>
        <p className="app-subtitle">シンプルで使いやすいタスク管理アプリ</p>
      </header>
      <main className="app-main">
        <TaskStats tasks={filteredTasks} />
        <TaskForm onSubmit={addTask} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
