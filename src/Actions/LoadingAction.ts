import { Action } from "redux";

export enum LoadingActionType {
  Start = "LOADING_START",
  Report = "LOADING_REPORT",
  End = "LOADING_END",
}

export interface LoadingInit {
  isProgressable: boolean;
  message: string;
}

export interface LoadingAction extends Action<LoadingActionType> {
  type: LoadingActionType;
  payload: number | null | LoadingInit;
}

export function loadingStart(
  isProgressable = false,
  message = "Loading... "
): LoadingAction {
  return {
    type: LoadingActionType.Start,
    payload: {
      isProgressable: isProgressable,
      message: message,
    },
  };
}

export function loadingReport(percentComplete: number): LoadingAction {
  return {
    type: LoadingActionType.Start,
    payload: percentComplete,
  };
}

export function loadingEnd(): LoadingAction {
  return {
    type: LoadingActionType.End,
    payload: null,
  };
}
