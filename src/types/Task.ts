export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  category?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  category?: string;
  completed?: boolean;
}

export const DEFAULT_CATEGORIES = [
  '仕事',
  'プライベート',
  '学習',
  '健康',
  '買い物',
  'その他'
];