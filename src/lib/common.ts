export type Awaitable<T> = T | PromiseLike<T>;

export interface IEntityId {
  id: string
}

export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type JSONObject = { [x: string]: JSONValue };

