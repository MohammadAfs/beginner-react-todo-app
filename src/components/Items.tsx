import { FC } from 'react';
import ItemType from '../shared/interfaces/Item.interface';
import Item from './Item';

const Items: FC<{ items: ItemType[] }> = ({ items }) => {
  return (
    <div className="items mb-6 flex flex-col flex-grow max-h-96 overflow-y-auto">
      {items.length ? (
        items.map(item => <Item item={item} key={item.id} />)
      ) : (
        <p className="text-center py-10">Nothing found :{'('}</p>
      )}
    </div>
  );
};

export default Items;
