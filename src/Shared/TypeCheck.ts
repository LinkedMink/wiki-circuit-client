import { Action } from "redux";

export const isAction = (value: unknown): value is Action =>
  (value as Action).type !== undefined;

export const isMap = <K, V>(value: unknown): value is Map<K, V> =>
  (value as Map<unknown, unknown>) instanceof Map;
