export enum ItemType {
  Active,
  Completed,
}

export default interface Item {
  id: number;
  name: string;
  description: string;
  type: ItemType;
}
