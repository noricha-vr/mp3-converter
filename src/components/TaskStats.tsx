import React from 'react';
import { Task } from '../types/Task';
import './TaskStats.css';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="task-stats">
      <div className="stat-item">
        <span className="stat-value">{totalTasks}</span>
        <span className="stat-label">全タスク</span>
      </div>
      <div className="stat-item">
        <span className="stat-value completed">{completedTasks}</span>
        <span className="stat-label">完了</span>
      </div>
      <div className="stat-item">
        <span className="stat-value pending">{pendingTasks}</span>
        <span className="stat-label">未完了</span>
      </div>
      <div className="stat-item">
        <span className="stat-value">{completionRate}%</span>
        <span className="stat-label">達成率</span>
      </div>
    </div>
  );
};