import React from 'react';
import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: { title?: string; description?: string; category?: string; dueDate?: Date; completed?: boolean }) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>タスクがありません。新しいタスクを追加してください。</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};