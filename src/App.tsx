import React, { useState, useMemo } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import './App.css';

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // カテゴリフィルター
    if (selectedCategory) {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // 検索フィルター
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // 完了タスクフィルター
    if (!showCompleted) {
      filtered = filtered.filter(task => !task.completed);
    }

    return filtered;
  }, [tasks, selectedCategory, searchQuery, showCompleted]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>OtoDake</h1>
        <p className="app-subtitle">シンプルで使いやすいタスク管理アプリ</p>
      </header>
      <main className="app-main">
        <TaskStats tasks={filteredTasks} />
        <TaskForm onSubmit={addTask} />
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showCompleted={showCompleted}
          onShowCompletedChange={setShowCompleted}
        />
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
