import { useEffect } from 'react';
import { useCallback } from 'react';
import { createContext, Dispatch, FC, useReducer } from 'react';
import { Todo, TodoType } from '../shared/interfaces/Todo.interface';

interface StateType {
  todos: Todo[];
}

interface ContextType {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

type Actions = 'ADD' | 'REMOVE' | 'COMPLETE';

const initialState: StateType = { todos: [] };
const initialContext: ContextType = { state: initialState, dispatch: () => {} };

export const TodosContext = createContext<ContextType>(initialContext);

type TodoAddData = Omit<Todo, 'id' | 'type'>;

interface ReducerPayloadType {
  id?: number;
  data?: TodoAddData;
}
interface ActionType {
  type: Actions;
  payload: ReducerPayloadType;
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'ADD': {
      const { data } = action.payload;
      if (!data) return { ...state };
      const ids = state.todos.map(t => t.id);
      const id = Math.max(...ids);
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: id === -Infinity ? 1 : id + 1, ...data, type: TodoType.Active },
        ],
      };
    }
    case 'REMOVE': {
      const { id } = action.payload;
      if (!id) return { ...state };
      const newTodos = state.todos.filter(t => t.id !== id);
      return { ...state, todos: newTodos };
    }
    case 'COMPLETE': {
      const { id } = action.payload;
      if (!id) return { ...state };
      const newTodos = state.todos.map(t =>
        t.id === id ? { ...t, type: TodoType.Completed } : t
      );
      return { ...state, todos: newTodos };
    }
    default:
      return { ...state };
  }
};

const TodosProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadFromLocalStorage = useCallback(() => {
    const todos = localStorage.getItem('todos');
    if (!todos) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
      return state.todos;
    }
    return JSON.parse(todos);
  }, [state.todos]);

  const saveToLocalStorage = useCallback(data_ => {
    const data = JSON.stringify(data_);
    localStorage.setItem('todos', data);
  }, []);

  useEffect(() => {
    const todos = loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  useEffect(() => {
    saveToLocalStorage(state.todos);
  }, [saveToLocalStorage, state.todos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
