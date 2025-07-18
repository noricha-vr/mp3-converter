import React, { useRef } from 'react';
import { Task } from '../types/Task';
import './ExportImport.css';

interface ExportImportProps {
  tasks: Task[];
  onImport: (tasks: Task[]) => void;
}

export const ExportImport: React.FC<ExportImportProps> = ({ tasks, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `otodake-tasks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedTasks = JSON.parse(content);
        
        // Validate imported data
        if (!Array.isArray(importedTasks)) {
          throw new Error('インポートされたデータが正しくありません');
        }
        
        // Convert date strings back to Date objects and validate structure
        const validatedTasks: Task[] = importedTasks.map(task => {
          if (!task.id || !task.title) {
            throw new Error('タスクデータが不完全です');
          }
          
          return {
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          };
        });
        
        onImport(validatedTasks);
        alert(`${validatedTasks.length}件のタスクをインポートしました`);
      } catch (error) {
        alert('ファイルの読み込みに失敗しました。正しいJSONファイルを選択してください。');
      }
    };
    
    reader.readAsText(file);
    // Reset input to allow importing the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="export-import">
      <h3 className="export-import-title">データのエクスポート/インポート</h3>
      <div className="export-import-actions">
        <button onClick={exportTasks} className="export-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="export-icon"
          >
            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          エクスポート
        </button>
        <label className="import-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="import-icon"
          >
            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          インポート
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={importTasks}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <p className="export-import-note">
        エクスポート: 現在のタスクをJSONファイルとして保存<br />
        インポート: JSONファイルからタスクを読み込み（既存データは置換）
      </p>
    </div>
  );
};