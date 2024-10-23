export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  weight: number;
  parentId?: number;
  children: number[];
  tags: string[];
}

export interface Tag {
  id: number;
  name: string;
  todos?: Todo[];
}

export interface CreateTodoInput {
  title: string;
  completed?: boolean;
  dueDate?: string;
  weight: number;
  parentId?: number;
  tags?: string[];
}

export interface UpdateTodoInput {
  id: number;
  title?: string;
  completed?: boolean;
  dueDate?: string;
  weight?: number;
  parentId?: number;
  tags?: string[];
}

export interface SequenceItem {
  type: string;
  title?: string;
  toolCalls?: string;
  subtitle?: string;
  content?: string;
}
