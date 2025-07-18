import React, { useState } from 'react';
import type { CreateTaskInput } from '../types/Task';
import { DEFAULT_CATEGORIES } from '../types/Task';
import { TagInput } from './TagInput';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      category: category || undefined,
      tags: tags.length > 0 ? tags : undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    setTitle('');
    setDescription('');
    setCategory('');
    setTags([]);
    setDueDate('');
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
      <TagInput
        tags={tags}
        onChange={setTags}
        placeholder="タグを追加（Enterで確定）"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="task-form-date"
        placeholder="期限日"
      />
      <button type="submit" className="task-form-button">
        タスクを追加
      </button>
    </form>
  );
};