import React, { useState } from 'react';
import { Task, DEFAULT_CATEGORIES } from '../types/Task';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: { title?: string; description?: string; category?: string; dueDate?: Date; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editCategory, setEditCategory] = useState(task.category || '');
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription || undefined,
      category: editCategory || undefined,
      dueDate: editDueDate ? new Date(editDueDate) : undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditCategory(task.category || '');
    setEditDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    setIsEditing(false);
  };

  const handleToggle = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const formatDueDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(date);
    dueDate.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)}日前`, className: 'overdue' };
    } else if (diffDays === 0) {
      return { text: '今日', className: 'due-today' };
    } else if (diffDays === 1) {
      return { text: '明日', className: 'due-soon' };
    } else if (diffDays <= 3) {
      return { text: `${diffDays}日後`, className: 'due-soon' };
    } else {
      return { text: dueDate.toLocaleDateString('ja-JP'), className: 'due-later' };
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="タスクのタイトル"
            className="task-input-title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="タスクの説明（オプション）"
            className="task-input-description"
          />
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="task-input-select"
          >
            <option value="">カテゴリを選択</option>
            {DEFAULT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="task-input-date"
          />
          <div className="task-actions">
            <button onClick={handleSave} className="btn-save">保存</button>
            <button onClick={handleCancel} className="btn-cancel">キャンセル</button>
          </div>
        </div>
      ) : (
        <div className="task-view">
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="task-checkbox"
            />
            <div className="task-text">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                {task.category && <span className="task-category">{task.category}</span>}
                {task.dueDate && !task.completed && (
                  <span className={`task-due-date ${formatDueDate(task.dueDate).className}`}>
                    {formatDueDate(task.dueDate).text}
                  </span>
                )}
              </div>
              {task.description && <p className="task-description">{task.description}</p>}
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">編集</button>
            <button onClick={() => onDelete(task.id)} className="btn-delete">削除</button>
          </div>
        </div>
      )}
    </div>
  );
};