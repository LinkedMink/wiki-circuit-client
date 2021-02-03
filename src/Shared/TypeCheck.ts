import { Action } from "redux";

export const isAction = (value: unknown): value is Action =>
  (value as Action).type !== undefined;

export const isMap = <K, V>(value: unknown): value is Map<K, V> =>
  (value as Map<unknown, unknown>) instanceof Map;

export const isString = (value: unknown): value is string =>
  typeof value === "string" || value instanceof String;

export const isArray = <T = unknown>(value: unknown): value is Array<T> =>
  Array.isArray(value);
