import { FC, MouseEventHandler, useContext } from 'react';
import { TodosContext } from '../context/Todos';
import { Todo as Todo_, TodoType } from '../shared/interfaces/Todo.interface';

const Todo: FC<{ item: Todo_ }> = ({ item }) => {
  const { dispatch } = useContext(TodosContext);
  const onComplete: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    dispatch({ type: 'todos/COMPLETE', payload: { id: item.id } });
  };

  const onRemove: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    dispatch({ type: 'todos/REMOVE', payload: { id: item.id } });
  };

  return (
    <div
      className="item p-3
    mb-2 border-2
    h-[100px] min-h-[100px] max-h-[100px]
    rounded-2xl border-gray-300 border-opacity-10
    shadow flex justify-between"
    >
      <div className="content max-w-[75%]">
        <h6 className="item-title font-bold text-lg overflow-hidden overflow-ellipsis">
          {item.name}
        </h6>
        <p className="item-description text-sm overflow-ellipsis max-h-10 line-clamp-2">
          {item.description}
        </p>
      </div>
      <div className="edit flex flex-col justify-around">
        <button
          onClick={onRemove}
          className="bg-red-500 text-white px-2 py-1 rounded-xl font-semibold
          hover:opacity-80 transition-all duration-300"
        >
          Remove
        </button>
        <button
          onClick={onComplete}
          disabled={item.type === TodoType.Completed}
          className={`${
            item.type === TodoType.Active ? 'bg-green-500' : 'bg-gray-500'
          } text-white px-2 py-1 rounded-xl font-semibold
          ${
            item.type === TodoType.Completed
              ? 'cursor-default'
              : 'cursor-pointer'
          }
          ${
            item.type === TodoType.Active &&
            'hover:opacity-80 transition-all duration-300'
          }`}
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default Todo;
