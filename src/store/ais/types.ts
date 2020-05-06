export interface Model {
  id: number;
}

export interface HashTable<T> {
  [key: number]: T;
}

export interface ChangeAction<T> {
  id: number;
  model: T;
}
