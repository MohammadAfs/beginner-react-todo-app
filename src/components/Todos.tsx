import { FC } from 'react';
import { Todo as Todo_ } from '../shared/interfaces/Todo.interface';
import Todo from './Todo';

const Todos: FC<{ items: Todo_[] }> = ({ items }) => {
  return (
    <div className="items mb-6 flex flex-col flex-grow max-h-96 overflow-y-auto">
      {items.length ? (
        items.map(item => <Todo item={item} key={item.id} />)
      ) : (
        <p className="text-center py-10">Nothing found :{'('}</p>
      )}
    </div>
  );
};

export default Todos;
