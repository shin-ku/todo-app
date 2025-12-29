import React from 'react';
import type { FilterType, Priority } from '../types/todo';

interface TodoFilterProps {
  filterType: FilterType;
  filterPriority: Priority | 'all';
  filterTag: string;
  allTags: string[];
  onFilterTypeChange: (type: FilterType) => void;
  onFilterPriorityChange: (priority: Priority | 'all') => void;
  onFilterTagChange: (tag: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterType,
  filterPriority,
  filterTag,
  allTags,
  onFilterTypeChange,
  onFilterPriorityChange,
  onFilterTagChange,
}) => {
  return (
    <div className="todo-filter">
      <div className="filter-group">
        <label>表示:</label>
        <div className="filter-buttons">
          <button
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => onFilterTypeChange('all')}
          >
            すべて
          </button>
          <button
            className={filterType === 'active' ? 'active' : ''}
            onClick={() => onFilterTypeChange('active')}
          >
            未完了
          </button>
          <button
            className={filterType === 'completed' ? 'active' : ''}
            onClick={() => onFilterTypeChange('completed')}
          >
            完了済み
          </button>
        </div>
      </div>

      <div className="filter-group">
        <label>優先度:</label>
        <select
          value={filterPriority}
          onChange={(e) => onFilterPriorityChange(e.target.value as Priority | 'all')}
          className="filter-select"
        >
          <option value="all">すべて</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
      </div>

      {allTags.length > 0 && (
        <div className="filter-group">
          <label>タグ:</label>
          <select
            value={filterTag}
            onChange={(e) => onFilterTagChange(e.target.value)}
            className="filter-select"
          >
            <option value="">すべて</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
