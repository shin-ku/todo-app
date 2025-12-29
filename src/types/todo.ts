export type Priority = 'high' | 'medium' | 'low';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TodoFormData {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
  tags: string[];
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoFilter {
  type: FilterType;
  priority?: Priority;
  tag?: string;
}
