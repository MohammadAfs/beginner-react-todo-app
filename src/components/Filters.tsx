import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import FilterType from '../shared/interfaces/Filter.interface';
import { ItemType } from '../shared/interfaces/Item.interface';

const types = [
  { name: 'All', value: null },
  { name: 'Active', value: ItemType.Active },
  { name: 'Completed', value: ItemType.Completed },
];

export type filterHandlerType = (filter: FilterType) => void;

const Filters: FC<{ filterHandler: filterHandlerType }> = ({
  filterHandler,
}) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ItemType | null>(null);

  const onSearch: ChangeEventHandler<HTMLInputElement> = e => {
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    filterHandler({ search, type });
  }, [search, type, filterHandler]);

  return (
    <div className="filter flex flex-col">
      <div className="search">
        <div className="mb-3 lg:w-80">
          <input
            type="search"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="search"
            placeholder="Type query"
            onChange={onSearch}
          />
        </div>
      </div>
      <div className="types flex-grow flex ">
        {types.map(type_ => (
          <button
            key={type_.value}
            className={`px-3 py-2 rounded-xl
                        lg:w-auto w-full
                      ${
                        type === type_.value ? 'bg-gray-600' : 'bg-gray-800'
                      } text-white hover:opacity-80
                      transition-all duration-150
                        mr-2 last:mr-0`}
            onClick={() => setType(type_.value)}
          >
            {type_.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
