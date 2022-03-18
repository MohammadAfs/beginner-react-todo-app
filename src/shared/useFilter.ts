import FilterType from './interfaces/Filter.interface';
import Item from './interfaces/Item.interface';

const useFilter = ({
  items,
  filters,
}: {
  items: Item[];
  filters: FilterType;
}): Item[] => {
  return items.filter(item => {
    if (
      !item.name.toLowerCase().includes(filters.search) &&
      !item.description.toLowerCase().includes(filters.search)
    ) {
      return false;
    }

    if (filters.type === null) return true;

    if (filters.type !== item.type) return false;

    return true;
  });
};

export default useFilter;
