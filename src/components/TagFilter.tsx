import React from 'react';
import type { Task } from '../types/Task';
import './TagFilter.css';

interface TagFilterProps {
  tasks: Task[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ tasks, selectedTags, onTagsChange }) => {
  // すべてのタグを抽出
  const allTags = Array.from(
    new Set(
      tasks
        .flatMap(task => task.tags || [])
        .filter(tag => tag.trim() !== '')
    )
  ).sort();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAll = () => {
    onTagsChange([]);
  };

  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <div className="tag-filter-header">
        <span className="tag-filter-label">タグでフィルター:</span>
        {selectedTags.length > 0 && (
          <button className="tag-filter-clear" onClick={clearAll}>
            すべてクリア
          </button>
        )}
      </div>
      <div className="tag-filter-list">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag-filter-item ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};