import React, { useState } from 'react';
import { Task } from '../types/Task';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: { title?: string; description?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDescription || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleToggle = () => {
    onUpdate(task.id, { completed: !task.completed });
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
              <h3 className="task-title">{task.title}</h3>
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