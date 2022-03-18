import { ItemType } from './Item.interface';

export default interface Filter {
  search: string;
  type: ItemType | null;
}
