import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { Todo as Todo_ } from '../shared/interfaces/Todo.interface';
import useFilter from '../shared/useFilter';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import Todos from './Todos';
import Filters from './Filters';
import FilterType from '../shared/interfaces/Filter.interface';
import Form from './Form';
import { TodosContext } from '../context/Todos';
import { useContext } from 'react';

const Todo: FC<{ items: Todo_[] }> = ({ items }) => {
  const { state } = useContext(TodosContext);
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    type: 0,
  });
  const filteredItems = useFilter({
    items: state.todos,
    filters,
  });
  const [formVisible, setFormVisibility] = useState<boolean>(false);

  const handleAdd: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setFormVisibility(true);
  };

  const filterHandler = useCallback(
    (filter: FilterType) => {
      setFilters(filter);
    },
    [setFilters]
  );

  return (
    <div className="flex flex-col justify-between w-full max-w-3xl shadow-2xl px-8 py-7 rounded-3xl min-h-[600px]">
      <div className="flex justify-between">
        <h3 className="items-title font-bold text-xl mb-5">Items:</h3>
        <button
          onClick={handleAdd}
          className={`${formVisible ? 'hidden' : ''} bg-gray-800 h-10 w-10
          flex justify-center items-center
          rounded-xl cursor-pointer select-none
          hover:scale-110 transition-all duration-500`}
        >
          <MdOutlineLibraryAdd size={24} color="white" />
        </button>
      </div>
      <Form visible={formVisible} />
      <Todos items={filteredItems} />
      <Filters filterHandler={filterHandler} />
    </div>
  );
};

export default Todo;
