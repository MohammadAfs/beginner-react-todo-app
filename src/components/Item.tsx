import { FC } from 'react';
import ItemType from '../shared/interfaces/Item.interface';

const Item: FC<{ item: ItemType }> = ({ item }) => {
  return (
    <div className="item p-3 rounded-2xl mb-2 border-2 h-[100px] min-h-[100px] max-h-[100px] border-gray-300 border-opacity-10 shadow">
      <h6 className="item-title font-bold text-lg overflow-hidden overflow-ellipsis">
        {item.name}
      </h6>
      <p className="item-description text-sm overflow-ellipsis max-h-10 line-clamp-2">
        {item.description}
      </p>
    </div>
  );
};

export default Item;
