import React from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import './App.css';

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  return (
    <div className="app">
      <header className="app-header">
        <h1>OtoDake</h1>
        <p className="app-subtitle">シンプルで使いやすいタスク管理アプリ</p>
      </header>
      <main className="app-main">
        <TaskStats tasks={tasks} />
        <TaskForm onSubmit={addTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
