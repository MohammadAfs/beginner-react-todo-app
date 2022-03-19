export enum TodoType {
  Active,
  Completed,
}

export interface Todo {
  id: number;
  name: string;
  description: string;
  type: TodoType;
}
