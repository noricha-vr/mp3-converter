import React, { useState } from 'react';
import { CreateTaskInput, DEFAULT_CATEGORIES } from '../types/Task';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      category: category || undefined,
    });

    setTitle('');
    setDescription('');
    setCategory('');
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
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-form-select"
      >
        <option value="">カテゴリを選択</option>
        {DEFAULT_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="task-form-button">
        タスクを追加
      </button>
    </form>
  );
};