import React, { useState } from 'react';
import type { TodoFormData, Priority } from '../types/todo';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      tags,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setTags([]);
    setTagInput('');
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タスクのタイトル"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="説明（オプション）"
          className="form-textarea"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>優先度</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="form-select"
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
          </select>
        </div>

        <div className="form-group">
          <label>期限</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label>タグ</label>
        <div className="tag-input-wrapper">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="タグを入力してEnter"
            className="form-input"
          />
          <button type="button" onClick={handleAddTag} className="btn-add-tag">
            追加
          </button>
        </div>
        {tags.length > 0 && (
          <div className="tags-display">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="btn-submit">
        タスクを追加
      </button>
    </form>
  );
};
