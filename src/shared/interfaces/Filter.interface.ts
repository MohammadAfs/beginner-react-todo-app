import { TodoType } from './Todo.interface';

export default interface Filter {
  search: string;
  type: TodoType | null;
}
