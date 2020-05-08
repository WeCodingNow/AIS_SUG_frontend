export interface Model {
  id: number;
}

export interface HashTable<T> {
  [key: number]: T;
}

export interface ModelState<T> {
  byID: HashTable<T>;
}

export function HashToArray<T>(hash: HashTable<T>): Array<T> {
  return Object.values(hash);
}

export interface ChangeAction<T> {
  id: number;
  model: T;
}
