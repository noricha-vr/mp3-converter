import React, { useState } from 'react';
import type { Task } from '../types/Task';
import { TaskItem } from './TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: { title?: string; description?: string; category?: string; dueDate?: Date; completed?: boolean }) => void;
  onDeleteTask: (id: string) => void;
  onReorderTasks?: (draggedId: string, targetId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask, onReorderTasks }) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  const handleDrop = (e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault();
    if (draggedTaskId && draggedTaskId !== targetTaskId && onReorderTasks) {
      onReorderTasks(draggedTaskId, targetTaskId);
    }
    setDraggedTaskId(null);
  };

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
        <div
          key={task.id}
          className={`task-item-wrapper ${draggedTaskId === task.id ? 'dragging' : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, task.id)}
        >
          <TaskItem
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        </div>
      ))}
    </div>
  );
};