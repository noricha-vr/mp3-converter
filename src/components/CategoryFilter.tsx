import React from 'react';
import { DEFAULT_CATEGORIES } from '../types/Task';
import './CategoryFilter.css';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const allCategories = ['すべて', ...DEFAULT_CATEGORIES];

  return (
    <div className="category-filter">
      <h3 className="category-filter-title">カテゴリで絞り込み</h3>
      <div className="category-filter-buttons">
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category === 'すべて' ? '' : category)}
            className={`category-filter-button ${selectedCategory === (category === 'すべて' ? '' : category) ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};