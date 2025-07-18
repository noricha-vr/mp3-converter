import React, { useMemo } from 'react';
import type { Task } from '../types/Task';
import './TaskDashboard.css';

interface TaskDashboardProps {
  tasks: Task[];
}

export const TaskDashboard: React.FC<TaskDashboardProps> = ({ tasks }) => {
  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Basic stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Category breakdown
    const categoryStats = tasks.reduce((acc, task) => {
      const category = task.category || '未分類';
      if (!acc[category]) {
        acc[category] = { total: 0, completed: 0 };
      }
      acc[category].total++;
      if (task.completed) {
        acc[category].completed++;
      }
      return acc;
    }, {} as Record<string, { total: number; completed: number }>);

    // Overdue tasks
    const overdueTasks = tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      new Date(task.dueDate) < today
    ).length;

    // Tasks due today
    const dueTodayTasks = tasks.filter(task => {
      if (!task.dueDate || task.completed) return false;
      const dueDate = new Date(task.dueDate);
      return dueDate.toDateString() === today.toDateString();
    }).length;

    // Completion trend
    const completedThisWeek = tasks.filter(task => {
      if (!task.completed || !task.updatedAt) return false;
      const completedDate = new Date(task.updatedAt);
      return completedDate >= weekAgo && completedDate <= today;
    }).length;

    const completedThisMonth = tasks.filter(task => {
      if (!task.completed || !task.updatedAt) return false;
      const completedDate = new Date(task.updatedAt);
      return completedDate >= monthAgo && completedDate <= today;
    }).length;

    // Average completion time (for completed tasks with due dates)
    const completionTimes = tasks
      .filter(task => task.completed && task.dueDate)
      .map(task => {
        const dueDate = new Date(task.dueDate!);
        const completedDate = new Date(task.updatedAt);
        return (dueDate.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24); // Days
      })
      .filter(days => days > 0); // Only tasks completed before due date
    
    const avgCompletionTime = completionTimes.length > 0
      ? Math.round(completionTimes.reduce((sum, days) => sum + days, 0) / completionTimes.length)
      : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      categoryStats,
      overdueTasks,
      dueTodayTasks,
      completedThisWeek,
      completedThisMonth,
      avgCompletionTime,
    };
  }, [tasks]);

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return 'progress-excellent';
    if (rate >= 60) return 'progress-good';
    if (rate >= 40) return 'progress-fair';
    return 'progress-poor';
  };

  return (
    <div className="task-dashboard">
      <h2 className="dashboard-title">タスク分析ダッシュボード</h2>
      
      <div className="dashboard-grid">
        {/* Overview Cards */}
        <div className="dashboard-card">
          <h3 className="card-title">全体の進捗</h3>
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className={`circle ${getProgressColor(stats.completionRate)}`}
                strokeDasharray={`${stats.completionRate}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">{stats.completionRate}%</text>
            </svg>
          </div>
          <div className="card-stats">
            <div className="stat-row">
              <span>完了:</span>
              <span className="stat-value">{stats.completedTasks}</span>
            </div>
            <div className="stat-row">
              <span>未完了:</span>
              <span className="stat-value">{stats.pendingTasks}</span>
            </div>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="dashboard-card">
          <h3 className="card-title">緊急タスク</h3>
          <div className="urgent-stats">
            <div className="urgent-item">
              <div className="urgent-count overdue">{stats.overdueTasks}</div>
              <div className="urgent-label">期限切れ</div>
            </div>
            <div className="urgent-item">
              <div className="urgent-count today">{stats.dueTodayTasks}</div>
              <div className="urgent-label">本日期限</div>
            </div>
          </div>
        </div>

        {/* Completion Trend */}
        <div className="dashboard-card">
          <h3 className="card-title">完了トレンド</h3>
          <div className="trend-stats">
            <div className="trend-item">
              <div className="trend-period">今週</div>
              <div className="trend-count">{stats.completedThisWeek}件</div>
            </div>
            <div className="trend-item">
              <div className="trend-period">今月</div>
              <div className="trend-count">{stats.completedThisMonth}件</div>
            </div>
          </div>
          {stats.avgCompletionTime > 0 && (
            <div className="avg-completion">
              平均: 期限{stats.avgCompletionTime}日前に完了
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="dashboard-card wide">
          <h3 className="card-title">カテゴリ別統計</h3>
          <div className="category-breakdown">
            {Object.entries(stats.categoryStats).map(([category, data]) => {
              const rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
              return (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <span className="category-name">{category}</span>
                    <span className="category-count">
                      {data.completed}/{data.total}
                    </span>
                  </div>
                  <div className="category-progress">
                    <div 
                      className="category-progress-bar"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};