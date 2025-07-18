import React, { useState } from 'react';
import { CreateTaskInput } from '../types/Task';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力"
        className="task-form-input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="タスクの説明（オプション）"
        className="task-form-textarea"
      />
      <button type="submit" className="task-form-button">
        タスクを追加
      </button>
    </form>
  );
};