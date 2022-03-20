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

type Actions =
  | 'todos/ADD'
  | 'todos/REMOVE'
  | 'todos/COMPLETE'
  | 'todos/SET'
  | 'darkmode/TOGGLE';

const initialState: StateType = { todos: [] };
const initialContext: ContextType = { state: initialState, dispatch: () => {} };

export const TodosContext = createContext<ContextType>(initialContext);

type TodoAddData = Omit<Todo, 'id' | 'type'>;

interface ReducerPayloadType {
  id?: number;
  data?: TodoAddData | Todo[];
}
interface ActionType {
  type: Actions;
  payload: ReducerPayloadType;
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'todos/ADD': {
      const { data } = action.payload;
      if (!data) return { ...state };
      if (Array.isArray(data)) return { ...state };
      const ids = state.todos.map(t => t.id);
      const id = Math.max(...ids);
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id === -Infinity ? 100000 : id + 1,
            ...data,
            type: TodoType.Active,
          },
        ],
      };
    }
    case 'todos/REMOVE': {
      const { id } = action.payload;
      if (!id) return { ...state };
      const newTodos = state.todos.filter(t => t.id !== id);
      return { ...state, todos: newTodos };
    }
    case 'todos/COMPLETE': {
      const { id } = action.payload;
      if (!id) return { ...state };
      const newTodos = state.todos.map(t =>
        t.id === id ? { ...t, type: TodoType.Completed } : t
      );
      console.log(newTodos);
      return { ...state, todos: newTodos };
    }
    case 'todos/SET': {
      const todos = action.payload.data;
      if (!Array.isArray(todos)) return { ...state };
      return { ...state, todos };
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveToLocalStorage = useCallback(data_ => {
    const data = JSON.stringify(data_);
    localStorage.setItem('todos', data);
  }, []);

  useEffect(() => {
    const todos = loadFromLocalStorage();
    dispatch({ type: 'todos/SET', payload: { data: todos } });
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
